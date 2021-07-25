import { useState, useEffect, useCallback, useRef } from 'react';
import { CLEAR_SINGLE, CLEAR_DOUBLE, CLEAR_TRIPLE, CLEAR_TETRIS, LEVEL_UP, VO_LEVEL_UP } from 'utils/SFXPaths';
import { SCORES_KEY, initializeKey, setKeyValue } from 'utils/localStorage';
import { MENU_PAGE, OPTIONS_PAGE, INGAME_PAGE } from 'utils/pagesMap';
import { CLASSIC_MODE, CLASSIC_OVERLOAD_MODE, PROGRESSIVE_OVERLOAD_MODE } from 'utils/gameModes';

const clearTable = {
  1: CLEAR_SINGLE,
  2: CLEAR_DOUBLE,
  3: CLEAR_TRIPLE,
  4: CLEAR_TETRIS,
};

const linePoints = [40, 100, 300, 1200];

const gameModesAbbreviations = {
  [CLASSIC_MODE]: 'Classic',
  [CLASSIC_OVERLOAD_MODE]: 'Overload',
  [PROGRESSIVE_OVERLOAD_MODE]: 'Progressive',
};

export const useGameStatus = ({ skillsAPI, SFX_API, isLocalStorageAvailable, optionsAPI }) => {
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
    state: {
      perfectionism,
    },
    actions: {
      calcExp,
      activatePerfectionism,
    },
  } = skillsAPI;

  const {
    actions: { playSFX },
  } = SFX_API;

  const {
    state: {
      gameMode,
    },
  } = optionsAPI;

  const setPageToMenu = () => setCurrentPage(MENU_PAGE);
  const setPageToOptions = () => setCurrentPage(OPTIONS_PAGE);
  const setPageToIngame = () => setCurrentPage(INGAME_PAGE);

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      playSFX(clearTable[rowsCleared]);

      if (rowsCleared === 4 && perfectionism.currentLevel && !perfectionism.onCooldown) {
        activatePerfectionism();
        setScore((prev) => Math.ceil(
          prev
          + linePoints[rowsCleared - 1]
          * (level + 1)
          * perfectionism.modifier[perfectionism.currentLevel],
        ));
      } else {
        setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
      }

      setRows((prev) => prev + rowsCleared);
      calcExp(rowsCleared);
    }
  }, [
    activatePerfectionism,
    calcExp,
    level,
    perfectionism.currentLevel,
    perfectionism.modifier,
    perfectionism.onCooldown,
    playSFX,
    rowsCleared,
  ]);

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

  const resetGameStatus = useCallback(() => {
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
  }, []);

  const updateScores = () => {
    const scores = [...storedScores];
    const gameModeAbbreviation = gameModesAbbreviations[gameMode];
    const newScore = [score, gameModeAbbreviation];

    if (scores.length < 5) {
      scores.push(newScore);
    } else if (newScore[0] > scores[scores.length - 1][0]) {
      scores.pop();
      scores.push(newScore);
    } else {
      return;
    }

    if (scores.length === 1) {
      if (scores[0][0] > 0) {
        setNewHighScore(true);
        newHighScoreRef.current = true;
      }
    } else {
      const firstEl = scores[0][0];
      const lastEl = scores[scores.length - 1][0];

      if (lastEl > firstEl) {
        setNewHighScore(true);
        newHighScoreRef.current = true;
      }

      scores.sort((a, b) => b[0] - a[0]);
    }

    setStoredScores(scores);
    if (isLocalStorageAvailable) setKeyValue(SCORES_KEY, scores);
  };

  useEffect(() => {
    setStoredScores(initializeKey(isLocalStorageAvailable, SCORES_KEY, []));
  }, [isLocalStorageAvailable]);

  useEffect(() => {
    // Increase level every 10 rows cleared
    if (rows > (level + 1) * 10) {
      playSFX(LEVEL_UP);
      playSFX(VO_LEVEL_UP);
      setLevel((prev) => prev + 1);
    }
  }, [level, playSFX, rows]);

  return {
    state: {
      score,
      level,
      rows,
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
