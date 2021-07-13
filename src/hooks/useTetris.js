import { useState } from 'react';
import { useInterval } from 'hooks/useInterval';
import { checkCollision } from 'utils/gameHelpers';
import { TETROMINO_MERGE, TETROMINO_MOVE, PAUSE_IN, PAUSE_OUT, BUTTON_SELECT, VO_LEVEL_UP, VO_GAME_OVER, GAME_OVER, VO_CONGRATULATIONS, VO_NEW_HIGHSCORE, LEVEL_UP, NEW_HIGHSCORE } from 'utils/SFXPaths';
import { MENU, INGAME } from 'utils/BGMPaths';

export const useTetris = ({ skillsAPI, gameStatusAPI, playerAPI, stageAPI, SFX_API, BGM_API }) => {
  const [inGame, setInGame] = useState(false);

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
    state: {
      level,
      rows,
      dropTime,
      onCountdown,
      gameStarted,
      ticking,
      paused,
      newHighScoreRef,
    },
    actions: {
      setLevel,
      setGameOver,
      setDropTime,
      setDialogIsOpen,
      setPaused,
      setOnCountdown,
      setGameStarted,
      setTicking,
      resetGameStatus,
      updateScores,
      setShowHighScores,
    },
  } = gameStatusAPI;

  const {
    state: {
      timeStop,
      pixelPocket,
    },
    actions: {
      resetSkills,
      setPixelPocket,
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
      changeBGM,
      pauseBGM,
    },
  } = BGM_API;

  const resetGame = () => {
    resetSkills();
    resetGameStatus();
    resetPlayer();
    resetStage();
  };

  const goToTetris = () => {
    setInGame(true);
    stopBGM();
    changeBGM(INGAME);
  };

  const goToMenu = () => {
    setInGame(false);
    resetGame();

    stopBGM();
    changeBGM(MENU);
    playBGM();
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
    if (onCountdown) cancelCountdown();
    pauseBGM();
    playSFX(PAUSE_IN);
    setTicking(false);
    setPaused(true);
  };

  const unpause = () => {
    playSFX(PAUSE_OUT);
    setPaused(false);
    startCountdown();
  };

  // MENU BUTTON - CONFIRMATION DIALOG
  const openConfirmationDialog = () => {
    pause();
    setDialogIsOpen(true);
  };

  const closeConfirmationDialog = () => {
    unpause();
    setDialogIsOpen(false);
  };

  const confirmDialog = () => {
    playSFX(BUTTON_SELECT);
    goToMenu();
  };

  const cancelDialog = () => {
    closeConfirmationDialog();
  };

  // START AND RESUME GAME
  const resumeGame = () => {
    playBGM();
    setTicking(true);
    setDropTime(1000);
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

    setTicking(false);
    setDropTime(null);

    stopBGM();
    playSFX(GAME_OVER);
    playSFX(VO_GAME_OVER);

    setTimeout(() => displayHighScores(), 1250);
  };

  // BUTTONS
  const handleStartButton = () => {
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
    // use confirmation dialog
    resetGame();
  };

  const handleMenuButton = () => {
    if (!gameStarted) {
      playSFX(BUTTON_SELECT);
      goToMenu();
    } else {
      openConfirmationDialog();
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
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      playSFX(LEVEL_UP);
      playSFX(VO_LEVEL_UP);
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        gameIsOver();
      }
      updatePlayerPos({ x: 0, y: 0, collided: !timeStop.active });
      playSFX(TETROMINO_MERGE);

      if (pixelPocket.onCooldown) {
        setPixelPocket((prev) => ({
          ...prev,
          onCooldown: false,
        }));
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  useInterval(() => {
    if (ticking && !timeStop.active) drop();
  }, dropTime);

  return {
    state: {
      inGame,
    },
    actions: {
      dropPlayer,
      movePlayer,
      goToMenu,
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
