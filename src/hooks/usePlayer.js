import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino, createNextPiecesArray } from 'utils/tetrominos';
import { STAGE_WIDTH, checkCollision } from 'utils/gameHelpers';

export const usePlayer = () => {
  const [hold, setHold] = useState([]);
  const [nextPieces, setNextPieces] = useState(createNextPiecesArray(3));

  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    // tetromino: TETROMINOS[0].shape,
    tetromino: TETROMINOS[0],
    collided: false,
  });

  function rotate(matrix, dir) {
    // Make the rows to become cols (transpose)
    const mtrx = matrix.map((_, index) => matrix.map((column) => column[index]));
    // Reverse each row to get a rotaded matrix
    if (dir > 0) return mtrx.map((row) => row.reverse());
    return mtrx.reverse();
  }

  function playerRotate(stage, dir) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino.shape[0].length) {
        rotate(clonedPlayer.tetromino.shape, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      // pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      pos: { x: (prev.pos.x + x), y: (prev.pos.y + y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    const newNextPieces = [...nextPieces];
    const nextPiece = newNextPieces.shift();
    newNextPieces.push(randomTetromino());

    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: nextPiece,
      collided: false,
    });
    setNextPieces(newNextPieces);
  }, [nextPieces]);

  const activateHold = () => {
    if (hold.length === 0) {
      setHold([player.tetromino]);
      resetPlayer();
    } else {
      const holdPiece = hold[0];
      setHold([player.tetromino]);
      setPlayer((prev) => ({
        ...prev,
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: holdPiece,
      }));
    }
  };

  return [player, nextPieces, hold, activateHold, updatePlayerPos, resetPlayer, playerRotate];
};

// Hold Implementation
// 1. If empty, take current player tetromino and store it in hold
// 2. If not empty, swap the current player tetromino with the piece in hold
