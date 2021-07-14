import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CLEAR_SINGLE, CLEAR_DOUBLE, CLEAR_TRIPLE, CLEAR_TETRIS } from 'utils/SFXPaths';
import { checkLocalStorageAvailability, initializeScores, setKeyValue } from 'utils/localStorage';

export const useGameStatus = ({ skillsAPI, SFX_API }) => {
  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState();
  const [storedScores, setStoredScores] = useState();

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [rows, setRows] = useState(0);
  const [rowsCleared, setRowsCleared] = useState(0);
  const [newHighScore, setNewHighScore] = useState(false);
  const [showHighScores, setShowHighScores] = useState(false);
  const newHighScoreRef = useRef(false);

  const [dropTime, setDropTime] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [onCountdown, setOnCountdown] = useState(null);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [ticking, setTicking] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const clearTable = useMemo(() => ({
    1: CLEAR_SINGLE,
    2: CLEAR_DOUBLE,
    3: CLEAR_TRIPLE,
    4: CLEAR_TETRIS,
  }), []);

  const {
    actions: {
      calcExp,
      activatePerfectionism,
    },
  } = skillsAPI;

  const {
    actions: { playSFX },
  } = SFX_API;

  const calcScore = useCallback(() => {
    const linePoints = [40, 100, 300, 1200];

    // We have score
    if (rowsCleared > 0) {
      playSFX(clearTable[rowsCleared]);
      if (rowsCleared === 4) activatePerfectionism();

      // This is how original Tetris score is calculated
      setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
      calcExp(rowsCleared);
    }
  }, [activatePerfectionism, calcExp, clearTable, level, playSFX, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore]);

  const resetGameStatus = () => {
    setScore(0);
    setLevel(0);
    setRows(0);
    setNewHighScore(false);
    newHighScoreRef.current = false;
    setShowHighScores(false);
    setDropTime(null);
    setGameStarted(false);
    setOnCountdown(null);
    setPaused(false);
    setGameOver(false);
    setDialogIsOpen(false);
    setTicking(false);
  };

  const updateScores = () => {
    const scores = [...storedScores];

    if (scores.length < 5) {
      scores.push(score);
    } else if (score > scores[scores.length - 1]) {
      scores.pop();
      scores.push(score);
    } else {
      return;
    }

    if (scores.length === 1) {
      if (scores[0] > 0) {
        setNewHighScore(true);
        newHighScoreRef.current = true;
      }
    } else {
      const firstEl = scores[0];
      const lastEl = scores[scores.length - 1];

      if (lastEl > firstEl) {
        setNewHighScore(true);
        newHighScoreRef.current = true;
      }

      scores.sort((a, b) => b - a);
    }

    setStoredScores(scores);
    if (isLocalStorageAvailable) setKeyValue(scores);
  };

  useEffect(() => {
    const localStorageAvailability = checkLocalStorageAvailability();

    setIsLocalStorageAvailable(localStorageAvailability);
    setStoredScores(initializeScores(localStorageAvailability));
  }, []);

  return {
    state: {
      score,
      level,
      rows,
      dropTime,
      rowsCleared,
      gameStarted,
      onCountdown,
      paused,
      gameOver,
      dialogIsOpen,
      ticking,
      newHighScore,
      newHighScoreRef,
      storedScores,
      showHighScores,
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
      updateScores,
      setShowHighScores,
    },
  };
};
