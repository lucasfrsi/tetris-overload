import { useState, useEffect } from 'react';
import { createMainStage, checkCollision } from 'utils/gameHelpers';

export const useStage = (playerAPI, skillsAPI) => {
  const [stage, setStage] = useState(createMainStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  const {
    state: { player },
    actions: { resetPlayer, updatePreCollisionY },
  } = playerAPI;

  const {
    state: { intuition },
  } = skillsAPI;

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
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [intuition.currentLevel, player, resetPlayer, updatePreCollisionY]);

  return {
    state: {
      stage,
      rowsCleared,
    },
    actions: {
      setStage,
    },
  };
};
