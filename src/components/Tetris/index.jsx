import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInGameAction as setInGame } from 'store/actions/tetris';

import { createStage, checkCollision } from 'utils/gameHelpers';

// Custom Hooks
import { useInterval } from 'hooks/useInterval';
import { usePlayer } from 'hooks/usePlayer';
import { useStage } from 'hooks/useStage';
import { useGameStatus } from 'hooks/useGameStatus';

// Components
import Stage from '../Stage';
import Menu from '../Menu';

import { StyledTetrisWrapper, StyledTetrisLayout } from './style';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared,
  );

  const inGame = useSelector((state) => state.tetris.inGame);
  const dispatch = useDispatch();
  const goToMenu = () => dispatch(setInGame(false));

  console.log('re-render Tetris', inGame);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  return (
    inGame ? (
      <StyledTetrisWrapper
        role="button"
        tabIndex="0"
        onKeyDown={(e) => move(e)}
        onKeyUp={keyUp}
      >
        <StyledTetrisLayout>
          <aside>
            <div>pocket/hold</div>
            <div>learned skills</div>
            <button type="button" onClick={goToMenu}>menu</button>
          </aside>
          <Stage stage={stage} />
          <aside>
            <div>next piece</div>
            <div>pieces stack</div>
            <div>score</div>
            <div>level</div>
            <div>lines</div>
            <button type="button" onClick={startGame}>start</button>
          </aside>
        </StyledTetrisLayout>
      </StyledTetrisWrapper>
    ) : <Menu />
  );
};

export default Tetris;

/*
  In-game Menus
  - Skill Tree
  - Pause

  Mechanics
  - Skills and Skill Tree
  - Coins randomly spawns on the stage, giving extra exp/money
  - Exp/money are also earned by clearing rows (the more rows at once, more exp/money is earned)
    - Clairvoyance
      =PASSIVE=
      = Allow the player to see the next piece(s)
    - Time Stop
      =ACTIVE=
      = Allow the player to freely move the piece for a certain period of time
    - Mimic
      =ACTIVE=
      = Set the next piece to be equal to the current one
    - Pixel Pocket
      =ACTIVE=
      = Stores a piece to be used later on
    - Perfectionist
      =PASSIVE=
      = Clearing 4 rows at once resets all abilities cooldown
    - Intuition
      =PASSIVE=
      = Shows a mark of where the piece will fall at
    - Greedy
      =PASSIVE=
      = Earns more exp/money per coin and rows cleared
*/
