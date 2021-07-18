export const useControllers = ({ skillsAPI, gameStatusAPI, playerAPI, stageAPI, tetrisAPI }) => {
  const {
    actions: {
      playerRotate,
      unshiftPlayerTetrominoCopy,
      hardDrop,
      holdPlayerTetromino,
    },
  } = playerAPI;

  const {
    state: {
      stage,
    },
  } = stageAPI;

  const {
    state: {
      paused,
      ticking,
      onCountdown,
      dialogIsOpen,
    },
    actions: {
      coreAutoDrop,
    },
  } = gameStatusAPI;

  const {
    actions: {
      dropPlayer,
      movePlayer,
      pause,
      unpause,
    },
  } = tetrisAPI;

  const {
    actions: {
      activateMimic,
      activateBlink,
      activateHold,
    },
  } = skillsAPI;

  const onKeyDown = (event) => {
    const { code, key } = event;

    if (ticking) {
      if (key === '1' || code === 'Numpad1') {
        movePlayer(-1);
      } else if (key === '2' || code === 'Numpad2') {
        dropPlayer();
      } else if (key === '3' || code === 'Numpad3') {
        movePlayer(1);
      } else if (key === '4' || code === 'Numpad4') {
        playerRotate(stage, -1);
      } else if (key === '5' || code === 'Numpad5') {
        activateBlink(hardDrop);
      } else if (key === '6' || code === 'Numpad6') {
        playerRotate(stage, 1);
      } else if (key === '7' || code === 'Numpad7') {
        activateHold(holdPlayerTetromino);
      } else if (key === '9' || code === 'Numpad9') {
        activateMimic(unshiftPlayerTetrominoCopy);
      } else if (key === 'p' || code === 'keyP') {
        pause();
      }
    } else if (key === 'p' || code === 'keyP') {
      if (onCountdown) {
        pause();
      } else if (paused && !dialogIsOpen) {
        unpause();
      }
    }
  };

  const onKeyUp = (event) => {
    const { code, key } = event;

    if (ticking) {
      // Activate the interval again when user releases down arrow.
      if (key === '2' || code === 'Numpad2') {
        coreAutoDrop();
      }
    }
  };

  return {
    state: {

    },
    actions: {
      onKeyDown,
      onKeyUp,
    },
  };
};

// IMPLEMENT:
// A way to not trigger the function over and over when key is pressed
// Mainly the dropPlayer() one
// IDEAL: trigger once, ignore the others until keyUp
