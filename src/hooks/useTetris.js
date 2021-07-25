import { useCallback, useEffect } from 'react';
import { checkCollision } from 'utils/gameHelpers';
import { TETROMINO_MERGE, TETROMINO_MOVE, PAUSE_IN, PAUSE_OUT, BUTTON_SELECT, VO_GAME_OVER, GAME_OVER, VO_CONGRATULATIONS, VO_NEW_HIGHSCORE, NEW_HIGHSCORE, BUTTON_START } from 'utils/SFXPaths';
import { MENU, INGAME } from 'utils/BGMPaths';
import { INGAME_PAGE } from 'utils/pagesMap';

export const useTetris = ({
  skillsAPI, gameStatusAPI, playerAPI, stageAPI, pieceHoldersAPI, SFX_API, BGM_API, optionsAPI,
}) => {
  const {
    state: {
      player,
    },
    actions: {
      updatePlayerPos,
      getPlayerNextPiece,
      resetPlayer,
    },
  } = playerAPI;

  const {
    state: {
      stage,
    },
    actions: {
      resetStage,
    },
  } = stageAPI;

  const {
    actions: {
      resetPieceHolders,
    },
  } = pieceHoldersAPI;

  const {
    state: {
      onCountdown,
      gameStarted,
      paused,
      newHighScoreRef,
      dialogIsOpen,
      currentPage,
    },
    actions: {
      setGameOver,
      setPaused,
      setOnCountdown,
      setGameStarted,
      resetGameStatus,
      updateScores,
      setShowHighScores,
      corePause,
      coreResume,
      coreManualDrop,
      coreAutoDrop,
      openMenuDialog,
      openResetDialog,
      closeDialog,
      setPageToMenu,
      setPageToOptions,
      setPageToIngame,
    },
  } = gameStatusAPI;

  const {
    actions: {
      resetSkills,
      removePixelPocketCooldown,
    },
  } = skillsAPI;

  const {
    actions: {
      playSFX,
    },
  } = SFX_API;

  const {
    actions: {
      playBGM,
      stopBGM,
      pauseBGM,
    },
  } = BGM_API;

  const {
    state: {
      gameMode,
    },
  } = optionsAPI;

  const resetGame = useCallback(() => {
    resetSkills();
    resetGameStatus();
    resetPlayer();
    resetStage();
    resetPieceHolders();
  }, [resetGameStatus, resetPieceHolders, resetPlayer, resetSkills, resetStage]);

  const goToTetris = () => {
    setPageToIngame();
    stopBGM();
  };

  const goToMenu = () => {
    setPageToMenu();
    if (currentPage === INGAME_PAGE) {
      resetGame();
      stopBGM();
      playBGM(MENU);
    }
  };

  const goToOptions = () => {
    setPageToOptions();
  };

  // START BUTTON - COUNTDOWN
  const startCountdown = () => {
    setOnCountdown(true);
  };

  const cancelCountdown = () => {
    setOnCountdown(false);
  };

  // PAUSE and UNPAUSE
  const pause = () => {
    if (!paused) {
      if (onCountdown) cancelCountdown();
      pauseBGM();
      playSFX(PAUSE_IN);
      corePause();
      setPaused(true);
    }
  };

  const unpause = () => {
    playSFX(PAUSE_OUT);
    setPaused(false);
    startCountdown();
  };

  // CONFIRMATION DIALOG
  const openConfirmationDialog = (type) => {
    pause();
    if (type === 'MENU') {
      openMenuDialog();
    } else if (type === 'RESET') {
      openResetDialog();
    }
  };

  const closeConfirmationDialog = () => {
    unpause();
    closeDialog();
  };

  const confirmDialog = () => {
    playSFX(BUTTON_SELECT);

    if (dialogIsOpen.type === 'MENU') {
      goToMenu();
    } else if (dialogIsOpen.type === 'RESET') {
      resetGame();
    }
  };

  const cancelDialog = () => {
    closeConfirmationDialog();
  };

  // START AND RESUME GAME
  const resumeGame = () => {
    playBGM(INGAME);
    coreResume();
  };

  const startGame = () => {
    setGameStarted(true);
    getPlayerNextPiece();
    resumeGame();
  };

  // HIGH SCORES
  const displayHighScores = () => {
    setShowHighScores(true);

    if (newHighScoreRef.current === true) {
      playSFX(NEW_HIGHSCORE);
      playSFX(VO_CONGRATULATIONS);
      setTimeout(() => playSFX(VO_NEW_HIGHSCORE), 1200);
    }
  };

  // GAME OVER
  const gameIsOver = () => {
    updateScores();
    setGameOver(true);

    corePause();

    stopBGM();
    playSFX(GAME_OVER);
    playSFX(VO_GAME_OVER);

    setTimeout(() => displayHighScores(), 1250);
  };

  // BUTTONS
  const handleStartButton = () => {
    playSFX(BUTTON_START);
    startCountdown();
  };

  const handlePauseButton = () => {
    if (paused) {
      unpause();
    } else {
      pause();
    }
  };

  const handleResetButton = () => {
    openConfirmationDialog('RESET');
  };

  const handleMenuButton = () => {
    if (!gameStarted) {
      playSFX(BUTTON_SELECT);
      goToMenu();
    } else {
      openConfirmationDialog('MENU');
    }
  };

  const handleHighScoresMenuButton = () => {
    goToMenu();
  };

  const handlePlayAgainButton = () => {
    resetGame();
    startCountdown();
  };

  const movePlayer = (xDir, yDir = 0) => {
    if (!checkCollision(player, stage, { x: xDir, y: yDir })) {
      updatePlayerPos({ x: xDir, y: yDir });
      playSFX(TETROMINO_MOVE);
    }
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over :(
      if (player.pos.y <= 1) {
        playSFX(TETROMINO_MERGE);
        gameIsOver();
        return;
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      coreAutoDrop();
      playSFX(TETROMINO_MERGE);
      removePixelPocketCooldown();
    }
  };

  const dropPlayer = () => {
    coreManualDrop();
    drop();
  };

  useEffect(() => {
    resetGame();
  }, [gameMode, resetGame]);

  return {
    actions: {
      drop,
      dropPlayer,
      movePlayer,
      goToMenu,
      goToOptions,
      goToTetris,
      confirmDialog,
      cancelDialog,
      pause,
      unpause,
      startGame,
      resumeGame,
      handleStartButton,
      handlePauseButton,
      handleResetButton,
      handleMenuButton,
      handlePlayAgainButton,
      handleHighScoresMenuButton,
    },
  };
};
