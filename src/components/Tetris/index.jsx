import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInGameAction as setInGame } from 'store/actions/tetris';

import { createMainStage, checkCollision } from 'utils/gameHelpers';

// Custom Hooks
import { useInterval } from 'hooks/useInterval';
import { usePlayer } from 'hooks/usePlayer';
import { useStage } from 'hooks/useStage';
import { useGameStatus } from 'hooks/useGameStatus';
import { usePieceHolders } from 'hooks/usePieceHolders';

// Components
import Stage from '../Stage';
import Menu from '../Menu';
import PieceHolder from '../PieceHolder';

import { StyledTetrisWrapper, StyledTetrisLayout } from './style';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const {
    player,
    nextPieces,
    hold,
    activateHold,
    activateMimic,
    updatePlayerPos,
    resetPlayer,
    playerRotate,
  } = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared,
  );
  const [nextStage, queueStage, holdStage] = usePieceHolders(nextPieces, hold);

  const inGame = useSelector((state) => state.tetris.inGame);
  const dispatch = useDispatch();
  const goToMenu = () => dispatch(setInGame(false));

  // console.log('re-render Tetris', inGame, nextPieces, player);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const onKeyUp = ({ code, key }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (key === 2 || code === 'Numpad2') {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createMainStage());
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
        // console.log('GAME OVER!!!');
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

  const onKeyDownHandler = ({ code, key }) => {
    if (!gameOver) {
      if (key === 1 || code === 'Numpad1') {
        movePlayer(-1);
      } else if (key === 3 || code === 'Numpad3') {
        movePlayer(1);
      } else if (key === 2 || code === 'Numpad2') {
        dropPlayer();
      } else if (key === 4 || code === 'Numpad4') {
        playerRotate(stage, -1);
      } else if (key === 6 || code === 'Numpad6') {
        playerRotate(stage, 1);
      } else if (key === 7 || code === 'Numpad7') {
        activateHold();
      } else if (key === 9 || code === 'Numpad9') {
        activateMimic();
      }
    }
  };

  return (
    inGame ? (
      <StyledTetrisWrapper
        role="button"
        tabIndex="0"
        onKeyDown={(e) => onKeyDownHandler(e)}
        onKeyUp={onKeyUp}
      >
        <StyledTetrisLayout>
          <aside>
            <PieceHolder pieceHolderStage={holdStage} />
            <div>learned skills</div>
            <button type="button" onClick={goToMenu}>menu</button>
          </aside>
          <Stage stage={stage} />
          <aside>
            <PieceHolder pieceHolderStage={nextStage} />
            <PieceHolder pieceHolderStage={queueStage} />
            <div>Score: {score}</div> {/* score */}
            <div>Level: {level}</div> {/* level */}
            <div>Rows: {rows}</div> {/* lines */}
            <button type="button" onClick={startGame}>start</button>
            {/* tests */}
            {/* <div>X {player.pos.x} Y {player.pos.y}</div> */}
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
    - Clairvoyance [OK]
      =PASSIVE=
      = Allow the player to see the next piece(s)
    - Time Stop
      =ACTIVE=
      = Allow the player to freely move the piece for a certain period of time
    - Mimic [OK]
      =ACTIVE=
      = Set the next piece to be equal to the current one
    - Pixel Pocket [OK]
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
    - Blink
      =ACTIVE=
      = Immediately set the piece to the intuition location mark

  TO-DOS
  1. Fix initial tetrominos position (horizontal)
  2. Check rotation to match original games
  3. Find a way to centralize next and queue pieces in container
*/
