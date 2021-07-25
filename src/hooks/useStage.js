import { useState, useEffect, useCallback } from 'react';
import { createMainStage, checkCollision } from 'utils/gameHelpers';

export const useStage = ({ skillsAPI, gameStatusAPI, playerAPI }) => {
  const [stage, setStage] = useState(createMainStage());

  const {
    state: { player },
    actions: { getPlayerNextPiece, updatePreCollisionY },
  } = playerAPI;

  const {
    state: { intuition },
  } = skillsAPI;

  const {
    state: { gameOver },
    actions: { setRowsCleared },
  } = gameStatusAPI;

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = (newStage) => newStage.reduce((acc, row) => {
      if (row.findIndex((cell) => cell[0] === 0) === -1) {
        setRowsCleared((prev) => prev + 1);
        acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
        return acc;
      }
      acc.push(row);
      return acc;
    }, []);

    const updateStage = (prevStage) => {
      // First flush the stage
      const newStage = prevStage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

      // Tetromino Highlight Logic
      if (intuition.currentLevel && player.tetromino.shape.length > 1) {
        // Calculate the y, up to the point there's a collision
        let tempY = 1;
        while (checkCollision(player, newStage, { x: 0, y: tempY }) === false) {
          tempY++;
        }
        tempY--;

        // Update player state, for Blink use
        updatePreCollisionY(tempY);

        // Draw the Tetromino Highlight
        player.tetromino.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              newStage[y + player.pos.y + tempY][x + player.pos.x] = [
                value,
                'clear',
                true,
              ];
            }
          });
        });
      }

      // Draw the current Tetromino
      player.tetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      // Check for score
      if (player.collided && !gameOver) {
        getPlayerNextPiece();
        return sweepRows(newStage);
      }
      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [
    gameOver,
    intuition.currentLevel,
    player, getPlayerNextPiece,
    setRowsCleared, updatePreCollisionY,
  ]);

  const resetStage = useCallback(() => {
    setStage(createMainStage());
  }, []);

  return {
    state: {
      stage,
    },
    actions: {
      resetStage,
    },
  };
};
