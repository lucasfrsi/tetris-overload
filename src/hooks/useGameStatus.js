import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = ({ skillsAPI, BGM_API }) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [rowsCleared, setRowsCleared] = useState(0);

  const [dropTime, setDropTime] = useState(null);

  const [gameState, setGameState] = useState({
    running: false,
    onCountdown: false,
    paused: false,
    gameOver: false,
    dialogIsOpen: false,
  });

  const setRunning = useCallback((state) => {
    setGameState((prev) => ({
      ...prev,
      running: state,
    }));
  }, []);

  const setOnCountdown = useCallback((state) => {
    setGameState((prev) => ({
      ...prev,
      onCountdown: state,
    }));
  }, []);

  const setPaused = useCallback((state) => {
    setGameState((prev) => ({
      ...prev,
      paused: state,
    }));
  }, []);

  const setGameOver = useCallback((state) => {
    setGameState((prev) => ({
      ...prev,
      gameOver: state,
    }));
  }, []);

  const setDialogIsOpen = useCallback((state) => {
    setGameState((prev) => ({
      ...prev,
      dialogIsOpen: state,
    }));
  }, []);

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
    if (gameState.paused) {
      pauseBGM();
    } else {
      playBGM();
    }
  }, [gameState.paused, pauseBGM, playBGM]);

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
      dropTime,
      rowsCleared,
      running: gameState.running,
      onCountdown: gameState.onCountdown,
      paused: gameState.paused,
      gameOver: gameState.gameOver,
      dialogIsOpen: gameState.dialogIsOpen,
    },
    actions: {
      setScore,
      setRows,
      setLevel,
      setDropTime,
      setRowsCleared,
      setRunning,
      setOnCountdown,
      setPaused,
      setGameOver,
      setDialogIsOpen,
    },
  };
};
