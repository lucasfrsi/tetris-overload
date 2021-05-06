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
import { useControllers } from 'hooks/useControllers';
// import { useSkills } from 'hooks/useSkills';

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
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(
    rowsCleared,
  );
  const { nextStage, queueStage, holdStage } = usePieceHolders(nextPieces, hold);
  const { onKeyDown, onKeyUp } = useControllers();

  const inGame = useSelector((state) => state.tetris.inGame);
  const dispatch = useDispatch();
  const goToMenu = () => dispatch(setInGame(false));

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
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
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const onKeyDownHandler = (event) => {
    onKeyDown({
      event,
      gameOver,
      stage,
      movePlayer,
      dropPlayer,
      playerRotate,
      activateHold,
      activateMimic,
    });
  };

  const onKeyUpHandler = (event) => {
    onKeyUp({
      event,
      gameOver,
      level,
      setDropTime,
    });
  };

  return (
    inGame ? (
      <StyledTetrisWrapper
        role="button"
        tabIndex="0"
        onKeyDown={onKeyDownHandler}
        onKeyUp={onKeyUpHandler}
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
            <div>Score: {score}</div>
            <div>Level: {level}</div>
            <div>Lines: {rows}</div>
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

  TO-DOS
  1. Fix initial tetrominos position (horizontal) and surge from sky
  2. Check rotation to match original games
  3. Find a way to centralize next and queue pieces in container (create stage the size of 'em)
  5. Add controls and the ability to choose all the keys
  6. Add pause and save game
  4. Add sound effects and cell animations
  5. Add song
  6. Style the entire game
  7. Play the game, tweak the math calculations + balance

  Next feats to implement:
  1. Blink
  2. Time Stop
  Then after implementing coin/orb spawn
  3. Greedy
  Then after implementing learning skills + adding cooldowns
  4. Perfectionist
*/
