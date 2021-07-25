import { useState, useEffect, useCallback } from 'react';
import { createStage } from 'utils/gameHelpers';

export const usePieceHolders = ({ skillsAPI, playerAPI }) => {
  const [holdStage, setHoldStage] = useState();
  const [firstOnQueueStage, setFirstOnQueueStage] = useState();
  const [secondOnQueueStage, setSecondOnQueueStage] = useState();
  const [thirdOnQueueStage, setThirdOnQueueStage] = useState();

  const {
    state: {
      nextPieces,
      hold,
    },
  } = playerAPI;

  const {
    state: {
      clairvoyance,
      pixelPocket,
    },
  } = skillsAPI;

  const createPieceStage = (piece) => {
    const pieceShape = piece.shape;
    return pieceShape.map((row) => row.map((value) => [value]));
  };

  useEffect(() => {
    if (clairvoyance.currentLevel) {
      setFirstOnQueueStage(createPieceStage(nextPieces[0]));

      if (clairvoyance.currentLevel > 1) {
        setSecondOnQueueStage(createPieceStage(nextPieces[1]));
      }

      if (clairvoyance.currentLevel > 2) {
        setThirdOnQueueStage(createPieceStage(nextPieces[2]));
      }
    }
  }, [clairvoyance.currentLevel, nextPieces]);

  useEffect(() => {
    if (pixelPocket.currentLevel) {
      if (hold.length === 0) {
        const emptyStage = createStage(4, 4);
        setHoldStage(emptyStage);
      } else {
        setHoldStage(createPieceStage(hold[0]));
      }
    }
  }, [hold, pixelPocket.currentLevel]);

  const resetPieceHolders = useCallback(() => {
    setHoldStage(undefined);
    setFirstOnQueueStage(undefined);
    setSecondOnQueueStage(undefined);
    setThirdOnQueueStage(undefined);
  }, []);

  return {
    state: {
      holdStage,
      firstOnQueueStage,
      secondOnQueueStage,
      thirdOnQueueStage,
    },
    actions: {
      resetPieceHolders,
    },
  };
};
