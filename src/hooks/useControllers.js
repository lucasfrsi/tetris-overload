import {
  MOVE_LEFT,
  MOVE_RIGHT,
  DROP,
  ROTATE_CW,
  ROTATE_ACW,
  HARD_DROP,
  HOLD,
  MIMIC,
  PAUSE,
} from 'utils/keyBindings';
import { CLASSIC_MODE } from 'utils/gameModes';

export const useControllers = ({
  skillsAPI,
  gameStatusAPI,
  playerAPI,
  stageAPI,
  tetrisAPI,
  optionsAPI,
}) => {
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

  const {
    state: {
      keyBindings,
      gameMode,
    },
  } = optionsAPI;

  const onKeyDown = (event) => {
    const { code, key } = event;

    if (ticking) {
      switch (true) {
        case (key === keyBindings[MOVE_LEFT].key) || (code === keyBindings[MOVE_LEFT].code):
          movePlayer(-1);
          break;
        case (key === keyBindings[MOVE_RIGHT].key) || (code === keyBindings[MOVE_RIGHT].code):
          movePlayer(1);
          break;
        case (key === keyBindings[DROP].key) || (code === keyBindings[DROP].code):
          dropPlayer();
          break;
        case (key === keyBindings[ROTATE_CW].key) || (code === keyBindings[ROTATE_CW].code):
          playerRotate(stage, 1);
          break;
        case (key === keyBindings[ROTATE_ACW].key) || (code === keyBindings[ROTATE_ACW].code):
          playerRotate(stage, -1);
          break;
        case (key === keyBindings[HARD_DROP].key) || (code === keyBindings[HARD_DROP].code):
          activateBlink(hardDrop);
          break;
        case (key === keyBindings[HOLD].key) || (code === keyBindings[HOLD].code):
          activateHold(holdPlayerTetromino);
          break;
        case (key === keyBindings[MIMIC].key) || (code === keyBindings[MIMIC].code):
          if (gameMode !== CLASSIC_MODE) activateMimic(unshiftPlayerTetrominoCopy);
          break;
        case (key === keyBindings[PAUSE].key) || (code === keyBindings[PAUSE].code):
          pause();
          break;
        default:
          break;
      }
    } else if ((key === keyBindings[PAUSE].key) || (code === keyBindings[PAUSE].code)) {
      if (onCountdown) {
        pause();
      } else if (paused && !dialogIsOpen.state) {
        unpause();
      }
    }
  };

  const onKeyUp = (event) => {
    const { code, key } = event;

    if (ticking) {
      if ((key === keyBindings[DROP].key) || (code === keyBindings[DROP].code)) {
        coreAutoDrop();
      }
    }
  };

  return {
    actions: {
      onKeyDown,
      onKeyUp,
    },
  };
};
