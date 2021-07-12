import { useState, useEffect, useCallback, useMemo } from 'react';
import { CLEAR_SINGLE, CLEAR_DOUBLE, CLEAR_TRIPLE, CLEAR_TETRIS } from 'utils/SFXPaths';
import { checkLocalStorageAvailability, initializeScores } from 'utils/localStorage';

export const useGameStatus = ({ skillsAPI, SFX_API }) => {
  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState();
  const [storedScores, setStoredScores] = useState();

  useEffect(() => {
    const localStorageAvailability = checkLocalStorageAvailability();

    setIsLocalStorageAvailable(localStorageAvailability);
    setStoredScores(initializeScores(localStorageAvailability));
  }, []);

  // just for testing
  useEffect(() => {
    console.log(isLocalStorageAvailable);
    console.log(storedScores);
  }, [isLocalStorageAvailable, storedScores]);

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

  const clearTable = useMemo(() => ({
    1: CLEAR_SINGLE,
    2: CLEAR_DOUBLE,
    3: CLEAR_TRIPLE,
    4: CLEAR_TETRIS,
  }), []);

  const {
    actions: { calcExp },
  } = skillsAPI;

  const {
    actions: { playSFX },
  } = SFX_API;

  const calcScore = useCallback(() => {
    const linePoints = [40, 100, 300, 1200];

    // We have score
    if (rowsCleared > 0) {
      playSFX(clearTable[rowsCleared]);

      // This is how original Tetris score is calculated
      setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
      calcExp(rowsCleared);
    }
  }, [calcExp, clearTable, level, playSFX, rowsCleared]);

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
