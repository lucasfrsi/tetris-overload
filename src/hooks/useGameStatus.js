import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = ({ skillsAPI }) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [rowsCleared, setRowsCleared] = useState(0);

  const [dropTime, setDropTime] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [onCountdown, setOnCountdown] = useState(null);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [ticking, setTicking] = useState(false);

  const {
    actions: { calcExp },
  } = skillsAPI;

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

  const resetGameStatus = () => {
    setScore(0);
    setLevel(0);
    setRows(0);
    setDropTime(null);
    setGameStarted(false);
    setOnCountdown(null);
    setPaused(false);
    setGameOver(false);
    setDialogIsOpen(false);
    setTicking(false);
  };

  return {
    state: {
      score,
      rows,
      level,
      dropTime,
      rowsCleared,
      gameStarted,
      onCountdown,
      paused,
      gameOver,
      dialogIsOpen,
      ticking,
    },
    actions: {
      setScore,
      setRows,
      setLevel,
      setDropTime,
      setRowsCleared,
      setGameStarted,
      setOnCountdown,
      setPaused,
      setGameOver,
      setDialogIsOpen,
      setTicking,
      resetGameStatus,
    },
  };
};
