import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (stageAPI) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const {
    state: { rowsCleared },
  } = stageAPI;

  const calcScore = useCallback(() => {
    const linePoints = [40, 100, 300, 1200];

    // We have score
    if (rowsCleared > 0) {
      // This is how original Tetris score is calculated
      setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return {
    state: {
      score,
      rows,
      level,
    },
    actions: {
      setScore,
      setRows,
      setLevel,
    },
  };
};
