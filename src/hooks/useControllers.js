export const useControllers = (skillsAPI, gameStatusAPI, playerAPI, stageAPI, tetrisAPI) => {
  const {
    actions: {
      playerRotate,
      activateHold,
      activateMimic,
      activateBlink,
    },
  } = playerAPI;

  const {
    state: {
      stage,
    },
  } = stageAPI;

  const {
    state: {
      level,
      gameOver,
    },
    actions: {
      setDropTime,
    },
  } = gameStatusAPI;

  const {
    actions: {
      dropPlayer,
      movePlayer,
    },
  } = tetrisAPI;

  const {
    state: {
      timeStop,
    },
    actions: {
      activateTimeStop,
    },
  } = skillsAPI;

  const onKeyDown = (event) => {
    const { code, key } = event;

    if (!gameOver) {
      if (key === '1' || code === 'Numpad1') {
        movePlayer(-1);
      } else if (key === '2' || code === 'Numpad2') {
        dropPlayer();
      } else if (key === '3' || code === 'Numpad3') {
        movePlayer(1);
      } else if (key === '4' || code === 'Numpad4') {
        playerRotate(stage, -1);
      } else if (key === '5' || code === 'Numpad5') {
        if (timeStop.active) movePlayer(0, -1);
      } else if (key === '6' || code === 'Numpad6') {
        playerRotate(stage, 1);
      } else if (key === '7' || code === 'Numpad7') {
        activateHold();
      } else if (key === '8' || code === 'Numpad8') {
        activateBlink();
      } else if (key === '9' || code === 'Numpad9') {
        activateMimic();
      } else if (key === '0' || code === 'Numpad0') {
        activateTimeStop();
      }
    }
  };

  const onKeyUp = (event) => {
    const { code, key } = event;

    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (key === '2' || code === 'Numpad2') {
        setDropTime(1000 / (level + 1));
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
