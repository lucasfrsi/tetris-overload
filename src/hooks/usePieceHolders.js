import { useState, useEffect } from 'react';
import { createStage } from 'utils/gameHelpers';

const SINGLE_STAGE_HEIGHT = 6;
const SINGLE_STAGE_WIDTH = 5;

const DOUBLE_STAGE_HEIGHT = SINGLE_STAGE_HEIGHT * 2;
const DOUBLE_STAGE_WIDTH = SINGLE_STAGE_WIDTH;

export const usePieceHolders = (skillsAPI, playerAPI) => {
  const [holdStage, setHoldStage] = useState(
    createStage(SINGLE_STAGE_HEIGHT, SINGLE_STAGE_WIDTH),
  );

  const [nextStage, setNextStage] = useState(null);

  const [queueStage, setQueueStage] = useState(
    createStage(DOUBLE_STAGE_HEIGHT, DOUBLE_STAGE_WIDTH),
  );

  const {
    state: { nextPieces, hold },
  } = playerAPI;

  const {
    state: { clairvoyance },
  } = skillsAPI;

  useEffect(() => {
    const updateNextStage = () => {
      if (clairvoyance.currentLevel) {
        const nextPiece = nextPieces[0];
        const nextPieceShape = nextPiece.shape;

        const newStage = nextPieceShape.map((row) => row.map((value) => [value]));

        return newStage;
      }
      return null;
    };

    const updateQueueStage = () => {
      const newStage = createStage(DOUBLE_STAGE_HEIGHT, DOUBLE_STAGE_WIDTH);

      for (let i = 0; i < 2; i++) {
        nextPieces[i + 1].shape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              newStage[y + (i * 7)][x + 1] = [value, 'merged'];
            }
          });
        });
      }

      return newStage;
    };

    setNextStage(updateNextStage());
    setQueueStage(updateQueueStage());
  }, [clairvoyance.currentLevel, nextPieces]);

  useEffect(() => {
    const updateHoldStage = () => {
      const newStage = createStage(SINGLE_STAGE_HEIGHT, SINGLE_STAGE_WIDTH);

      if (hold.length === 0) {
        return newStage;
      }

      hold[0].shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + 1][x + 1] = [value, 'merged'];
          }
        });
      });

      return newStage;
    };

    setHoldStage(updateHoldStage());
  }, [hold]);

  return {
    state: {
      nextStage,
      queueStage,
      holdStage,
    },
    actions: {

    },
  };
};
