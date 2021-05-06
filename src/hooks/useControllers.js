export const useControllers = () => {
  const onKeyDown = ({
    event: { code, key },
    gameOver,
    stage,
    movePlayer,
    playerRotate,
    dropPlayer,
    activateMimic,
    activateHold,
  }) => {
    if (!gameOver) {
      if (key === 1 || code === 'Numpad1') {
        movePlayer(-1);
      } else if (key === 3 || code === 'Numpad3') {
        movePlayer(1);
      } else if (key === 2 || code === 'Numpad2') {
        dropPlayer();
      } else if (key === 4 || code === 'Numpad4') {
        playerRotate(stage, -1);
      } else if (key === 6 || code === 'Numpad6') {
        playerRotate(stage, 1);
      } else if (key === 7 || code === 'Numpad7') {
        activateHold();
      } else if (key === 9 || code === 'Numpad9') {
        activateMimic();
      }
    }
  };

  const onKeyUp = ({
    event: { code, key },
    gameOver,
    level,
    setDropTime,
  }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (key === 2 || code === 'Numpad2') {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  return {
    onKeyDown,
    onKeyUp,
  };
};
