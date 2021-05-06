import { useState, useEffect } from 'react';
import { createMainStage, checkCollision } from 'utils/gameHelpers';

export const useStage = (playerAPI) => {
  const [stage, setStage] = useState(createMainStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  const {
    state: { player },
    actions: { resetPlayer },
  } = playerAPI;

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

      const intuition = true;
      // Draw the tetromino highlight
      if (intuition && !player.collided && player.tetromino.shape.length > 1) {
        // Calculate the y, up to the point there's a collision
        let count = 1;
        while (checkCollision(player, newStage, { x: 0, y: count }) === false) {
          count++;
        }
        count--;

        // Paint the tetromino highlight
        player.tetromino.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              newStage[y + player.pos.y + count][x + player.pos.x] = [
                value,
                'clear',
                true,
              ];
            }
          });
        });
      }

      // Then draw the tetromino
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

      // Then check if we got some score if collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    };

    // Here are the updates
    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  // player,
  // player.collided,
  // player.pos.x,
  // player.pos.y,
  // player.tetromino,
  // resetPlayer,

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
