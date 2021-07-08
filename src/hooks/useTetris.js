import { useInterval } from 'hooks/useInterval';

import { checkCollision, createMainStage } from 'utils/gameHelpers';
import { TETROMINO_MERGE, TETROMINO_MOVE } from 'utils/SFXPaths';

export const useTetris = ({ skillsAPI, gameStatusAPI, playerAPI, stageAPI, SFX_API }) => {
  const {
    state: {
      player,
    },
    actions: {
      updatePlayerPos,
      resetPlayer,
    },
  } = playerAPI;

  const {
    state: {
      stage,
    },
    actions: {
      setStage,
    },
  } = stageAPI;

  const {
    state: {
      level,
      rows,
      dropTime,
    },
    actions: {
      setLevel,
      setRows,
      setScore,
      setGameOver,
      setDropTime,
    },
  } = gameStatusAPI;

  const {
    state: {
      paused,
      timeStop,
    },
  } = skillsAPI;

  const {
    actions: {
      playSFX,
    },
  } = SFX_API;

  const movePlayer = (xDir, yDir = 0) => {
    if (!checkCollision(player, stage, { x: xDir, y: yDir })) {
      updatePlayerPos({ x: xDir, y: yDir });
      playSFX(TETROMINO_MOVE);
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
      // playSFX(TETROMINO_MOVE);
    } else {
      // Game over!
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: !timeStop.active });
      playSFX(TETROMINO_MERGE);
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  useInterval(() => {
    if (!paused && !timeStop.active) drop();
  }, dropTime);

  return {
    actions: {
      dropPlayer,
      movePlayer,
      startGame,
      setDropTime,
    },
  };
};
