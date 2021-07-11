import { useState } from 'react';
import { useInterval } from 'hooks/useInterval';
import { checkCollision } from 'utils/gameHelpers';
import { TETROMINO_MERGE, TETROMINO_MOVE } from 'utils/SFXPaths';
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
    },
  } = gameStatusAPI;

  const {
    state: {
      timeStop,
    },
    actions: {
      resetSkills,
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

  const movePlayer = (xDir, yDir = 0) => {
    if (!checkCollision(player, stage, { x: xDir, y: yDir })) {
      updatePlayerPos({ x: xDir, y: yDir });
      playSFX(TETROMINO_MOVE);
    }
  };

  // pixelpocket can only be used ONCE per piece falling
  // once it is used, a piece need to merge for it to be reusable again

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        stopBGM();
      }
      updatePlayerPos({ x: 0, y: 0, collided: !timeStop.active });
      playSFX(TETROMINO_MERGE);
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  useInterval(() => {
    if (ticking && !timeStop.active) drop();
  }, dropTime);

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
    setTicking(false);
    setPaused(true);
  };

  const unpause = () => {
    setPaused(false);
    startCountdown();
  };

  // MENU BUTTON - CONFIRMATION DIALOG
  const openConfirmationDialog = () => {
    if (!onCountdown && !gameStarted) {
      goToMenu();
    } else {
      pause();
      setDialogIsOpen(true);
    }
  };

  const closeConfirmationDialog = () => {
    unpause();
    setDialogIsOpen(false);
  };

  const confirmDialog = () => {
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

  return {
    state: {
      inGame,
    },
    actions: {
      dropPlayer,
      movePlayer,
      goToMenu,
      goToTetris,
      startCountdown,
      openConfirmationDialog,
      confirmDialog,
      cancelDialog,
      pause,
      unpause,
      startGame,
      resumeGame,
    },
  };
};
