import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino, createNextPiecesArray, restartPool } from 'utils/tetrominos';
import { STAGE_WIDTH, checkCollision } from 'utils/gameHelpers';

import { TETROMINO_ROTATE } from 'utils/SFXPaths';

export const usePlayer = ({ SFX_API }) => {
  const [hold, setHold] = useState([]);
  const [nextPieces, setNextPieces] = useState(createNextPiecesArray(3));
  const [preCollisionY, setPreCollisionY] = useState(0);

  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0],
    collided: false,
  });

  const {
    actions: {
      playSFX,
    },
  } = SFX_API;

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
    playSFX(TETROMINO_ROTATE);
  }

  const updatePreCollisionY = useCallback((y) => {
    setPreCollisionY(y);
  }, []);

  const updatePlayerPos = useCallback(({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x + x), y: (prev.pos.y + y) },
      collided,
    }));
  }, []);

  const getPlayerNextPiece = useCallback(() => {
    const newNextPieces = [...nextPieces];
    const nextPiece = newNextPieces.shift();
    // Mimic Check
    if (newNextPieces.length < 3) newNextPieces.push(randomTetromino());

    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: nextPiece,
      collided: false,
    });
    setNextPieces(newNextPieces);
  }, [nextPieces]);

  const holdPlayerTetromino = useCallback(() => {
    if (hold.length === 0) {
      setHold([player.tetromino]);
      getPlayerNextPiece();
    } else {
      const holdPiece = hold[0];
      setHold([player.tetromino]);
      setPlayer((prev) => ({
        ...prev,
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: holdPiece,
      }));
    }
  }, [getPlayerNextPiece, hold, player.tetromino]);

  const unshiftPlayerTetrominoCopy = useCallback(() => {
    const newNextPieces = [...nextPieces];
    newNextPieces.unshift(player.tetromino);
    setNextPieces(newNextPieces);
  }, [nextPieces, player.tetromino]);

  const hardDrop = useCallback(() => {
    updatePlayerPos({ x: 0, y: preCollisionY, collided: true });
  }, [preCollisionY, updatePlayerPos]);

  const resetPlayer = useCallback(() => {
    setHold([]);
    restartPool();
    setNextPieces(createNextPiecesArray(3));
    setPreCollisionY(0);
    setPlayer({
      pos: { x: 0, y: 0 },
      tetromino: TETROMINOS[0],
      collided: false,
    });
  }, []);

  return {
    state: {
      player,
      nextPieces,
      hold,
    },
    actions: {
      holdPlayerTetromino,
      hardDrop,
      updatePlayerPos,
      getPlayerNextPiece,
      playerRotate,
      updatePreCollisionY,
      resetPlayer,
      unshiftPlayerTetrominoCopy,
    },
  };
};
