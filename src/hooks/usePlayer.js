import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino, createNextPiecesArray } from 'utils/tetrominos';
import { STAGE_WIDTH, checkCollision } from 'utils/gameHelpers';

export const usePlayer = (skillsAPI) => {
  const [hold, setHold] = useState([]);
  const [nextPieces, setNextPieces] = useState(createNextPiecesArray(3));
  const [preCollisionY, setPreCollisionY] = useState(0);

  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0],
    collided: false,
  });

  const {
    constants: {
      INTERVAL_DELAY,
    },
    state: {
      blink,
      mimic,
      pixelPocket,
    },
    actions: {
      setMimic,
    },
  } = skillsAPI;

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

  const resetPlayer = useCallback(() => {
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

  const activateHold = useCallback(() => {
    if (pixelPocket.currentLevel) {
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
    }
  }, [hold, pixelPocket.currentLevel, player.tetromino, resetPlayer]);

  const activateMimic = useCallback(() => {
    if (mimic.currentLevel && !mimic.onCooldown) {
      setMimic((prev) => ({
        ...prev,
        onCooldown: prev.cooldown[prev.currentLevel],
        cooldownTimer: INTERVAL_DELAY,
      }));
      const newNextPieces = [...nextPieces];
      newNextPieces.unshift(player.tetromino);
      setNextPieces(newNextPieces);
    }
  }, [
    INTERVAL_DELAY,
    mimic.currentLevel,
    mimic.onCooldown,
    nextPieces,
    player.tetromino,
    setMimic,
  ]);

  const activateBlink = useCallback(() => {
    if (blink.currentLevel) {
      updatePlayerPos({ x: 0, y: preCollisionY, collided: true });
    }
  }, [
    blink.currentLevel,
    preCollisionY,
    updatePlayerPos,
  ]);

  return {
    state: {
      player,
      nextPieces,
      hold,
    },
    actions: {
      activateHold,
      activateMimic,
      activateBlink,
      updatePlayerPos,
      resetPlayer,
      playerRotate,
      updatePreCollisionY,
    },
  };
};
