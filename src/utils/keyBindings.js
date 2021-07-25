export const MOVE_LEFT = 'Move left';
export const MOVE_RIGHT = 'Move right';
export const DROP = 'Drop';
export const ROTATE_CW = 'Rotate left';
export const ROTATE_ACW = 'Rotate right';
export const HARD_DROP = 'Hard drop';
export const HOLD = 'Hold';
export const MIMIC = 'Mimic';
export const PAUSE = 'Pause';

const NUMPAD_BINDINGS = {
  [MOVE_LEFT]: {
    key: '1',
    code: 'Numpad1',
  },
  [MOVE_RIGHT]: {
    key: '3',
    code: 'Numpad3',
  },
  [DROP]: {
    key: '2',
    code: 'Numpad2',
  },
  [ROTATE_CW]: {
    key: '4',
    code: 'Numpad4',
  },
  [ROTATE_ACW]: {
    key: '6',
    code: 'Numpad6',
  },
  [HARD_DROP]: {
    key: '5',
    code: 'Numpad5',
  },
  [HOLD]: {
    key: '7',
    code: 'Numpad7',
  },
  [MIMIC]: {
    key: '9',
    code: 'Numpad9',
  },
  [PAUSE]: {
    key: '8',
    code: 'Numpad8',
  },
};

const QWER_BINDINGS = {
  [MOVE_LEFT]: {
    key: 'ArrowLeft',
    code: 'ArrowLeft',
  },
  [MOVE_RIGHT]: {
    key: 'ArrowRight',
    code: 'ArrowRight',
  },
  [DROP]: {
    key: 'ArrowDown',
    code: 'ArrowDown',
  },
  [ROTATE_CW]: {
    key: 'w',
    code: 'KeyW',
  },
  [ROTATE_ACW]: {
    key: 'e',
    code: 'KeyE',
  },
  [HARD_DROP]: {
    key: 'ArrowUp',
    code: 'ArrowUp',
  },
  [HOLD]: {
    key: 'q',
    code: 'KeyQ',
  },
  [MIMIC]: {
    key: 'r',
    code: 'keyR',
  },
  [PAUSE]: {
    key: 'p',
    code: 'KeyP',
  },
};

const EMPTY_BINDINGS = {
  [MOVE_LEFT]: {
    key: '',
    code: '',
  },
  [MOVE_RIGHT]: {
    key: '',
    code: '',
  },
  [DROP]: {
    key: '',
    code: '',
  },
  [ROTATE_CW]: {
    key: '',
    code: '',
  },
  [ROTATE_ACW]: {
    key: '',
    code: '',
  },
  [HARD_DROP]: {
    key: '',
    code: '',
  },
  [HOLD]: {
    key: '',
    code: '',
  },
  [MIMIC]: {
    key: '',
    code: '',
  },
  [PAUSE]: {
    key: '',
    code: '',
  },
};

export const getNUMPADKeyBindings = () => JSON.parse(JSON.stringify(NUMPAD_BINDINGS));
export const getQWERKeyBindings = () => JSON.parse(JSON.stringify(QWER_BINDINGS));
export const getEmptyKeyBindings = () => JSON.parse(JSON.stringify(EMPTY_BINDINGS));

// Modes
export const NUMPAD_MODE = 'Numeric Keypad';
export const QWER_MODE = 'Arrows + QWER';
export const CUSTOM_MODE = 'Custom';

export const keyBindingsModes = [
  NUMPAD_MODE,
  QWER_MODE,
  CUSTOM_MODE,
];
