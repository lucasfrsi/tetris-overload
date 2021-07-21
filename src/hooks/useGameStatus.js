import { useState, useEffect, useCallback, useRef } from 'react';
import { CLEAR_SINGLE, CLEAR_DOUBLE, CLEAR_TRIPLE, CLEAR_TETRIS } from 'utils/SFXPaths';
import { SCORES_KEY, initializeKey, setKeyValue } from 'utils/localStorage';
import { MENU_PAGE, OPTIONS_PAGE, INGAME_PAGE } from 'utils/pagesMap';

const clearTable = {
  1: CLEAR_SINGLE,
  2: CLEAR_DOUBLE,
  3: CLEAR_TRIPLE,
  4: CLEAR_TETRIS,
};

export const useGameStatus = ({ skillsAPI, SFX_API, isLocalStorageAvailable }) => {
  const [storedScores, setStoredScores] = useState();

  const [currentPage, setCurrentPage] = useState(MENU_PAGE);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [rows, setRows] = useState(0);
  const [rowsCleared, setRowsCleared] = useState(0);
  const [newHighScore, setNewHighScore] = useState(false);
  const [showHighScores, setShowHighScores] = useState(false);
  const newHighScoreRef = useRef(false);

  const [gameStarted, setGameStarted] = useState(false);
  const [onCountdown, setOnCountdown] = useState(null);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState({
    state: false,
    type: '',
  });

  // CORE
  const [ticking, setTicking] = useState(false);
  const [dropTime, setDropTime] = useState(null);
  const speed = useRef(0);

  const {
    actions: {
      calcExp,
      activatePerfectionism,
    },
  } = skillsAPI;

  const {
    actions: { playSFX },
  } = SFX_API;

  const setPageToMenu = () => setCurrentPage(MENU_PAGE);
  const setPageToOptions = () => setCurrentPage(OPTIONS_PAGE);
  const setPageToIngame = () => setCurrentPage(INGAME_PAGE);

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
  }, [activatePerfectionism, calcExp, level, playSFX, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore]);

  const openMenuDialog = () => {
    setDialogIsOpen({
      state: true,
      type: 'MENU',
    });
  };

  const openResetDialog = () => {
    setDialogIsOpen({
      state: true,
      type: 'RESET',
    });
  };

  const closeDialog = () => {
    setDialogIsOpen({
      state: false,
      type: '',
    });
  };

  const coreReset = () => {
    setTicking(false);
    setDropTime(null);
    speed.current = 1000;
  };

  const coreResume = () => {
    setTicking(true);
    setDropTime(speed.current);
  };

  const corePause = () => {
    setTicking(false);
    setDropTime(null);
  };

  const coreManualDrop = () => {
    // TEST
    // setDropTime(25);
    setDropTime(null);
  };

  const coreAutoDrop = () => {
    setDropTime(speed.current);
  };

  const coreUpdateSpeed = useCallback(() => {
    speed.current = 1000 - (level * 50);
  }, [level]);

  useEffect(() => {
    coreUpdateSpeed();
  }, [coreUpdateSpeed]);

  const resetGameStatus = () => {
    setScore(0);
    setLevel(0);
    setRows(0);
    setNewHighScore(false);
    newHighScoreRef.current = false;
    setShowHighScores(false);
    setGameStarted(false);
    setOnCountdown(null);
    setPaused(false);
    setGameOver(false);
    closeDialog();
    coreReset();
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
    if (isLocalStorageAvailable) setKeyValue(SCORES_KEY, scores);
  };

  useEffect(() => {
    setStoredScores(initializeKey(isLocalStorageAvailable, SCORES_KEY, []));
  }, [isLocalStorageAvailable]);

  return {
    state: {
      score,
      level,
      rows,
      rowsCleared,
      gameStarted,
      onCountdown,
      paused,
      gameOver,
      dialogIsOpen,
      ticking,
      dropTime,
      newHighScore,
      newHighScoreRef,
      storedScores,
      showHighScores,
      currentPage,
    },
    actions: {
      setScore,
      setRows,
      setLevel,
      setRowsCleared,
      setGameStarted,
      setOnCountdown,
      setPaused,
      setGameOver,
      setDialogIsOpen,
      resetGameStatus,
      updateScores,
      setShowHighScores,
      coreResume,
      corePause,
      coreManualDrop,
      coreAutoDrop,
      openMenuDialog,
      openResetDialog,
      closeDialog,
      setPageToMenu,
      setPageToOptions,
      setPageToIngame,
    },
  };
};
