import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = ({ skillsAPI, BGM_API }) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const [rowsCleared, setRowsCleared] = useState(0);

  const {
    actions: { calcExp },
  } = skillsAPI;

  const {
    actions: {
      playBGM,
      pauseBGM,
    },
  } = BGM_API;

  useEffect(() => {
    if (paused) {
      pauseBGM();
    } else {
      playBGM();
    }
  }, [pauseBGM, paused, playBGM]);

  const calcScore = useCallback(() => {
    const linePoints = [40, 100, 300, 1200];

    // We have score
    if (rowsCleared > 0) {
      // This is how original Tetris score is calculated
      setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
      calcExp(rowsCleared);
    }
  }, [calcExp, level, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore]);

  return {
    state: {
      score,
      rows,
      level,
      gameOver,
      dropTime,
      rowsCleared,
      paused,
    },
    actions: {
      setScore,
      setRows,
      setLevel,
      setGameOver,
      setDropTime,
      setRowsCleared,
      setPaused,
    },
  };
};
