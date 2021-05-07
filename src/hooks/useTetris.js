import { useState } from 'react';
import { useInterval } from 'hooks/useInterval';

import { checkCollision, createMainStage } from 'utils/gameHelpers';

export const useTetris = (playerAPI, stageAPI, gameStatusAPI, skillsAPI) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

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
    },
    actions: {
      setLevel,
      setRows,
      setScore,
    },
  } = gameStatusAPI;

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

  return {
    state: {
      gameOver,
    },
    actions: {
      dropPlayer,
      movePlayer,
      startGame,
      setDropTime,
    },
  };
};
