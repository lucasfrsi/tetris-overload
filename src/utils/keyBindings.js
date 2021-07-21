const NUMPAD_BINDINGS = {
  left: {
    key: '1',
    code: 'Numpad1',
  },
  right: {
    key: '3',
    code: 'Numpad3',
  },
  drop: {
    key: '2',
    code: 'Numpad2',
  },
  rotateCW: {
    key: '4',
    code: 'Numpad4',
  },
  rotateACW: {
    key: '6',
    code: 'Numpad6',
  },
  hardDrop: {
    key: '5',
    code: 'Numpad5',
  },
  hold: {
    key: '7',
    code: 'Numpad7',
  },
  mimic: {
    key: '9',
    code: 'Numpad9',
  },
  pause: {
    key: '8',
    code: 'Numpad8',
  },
};

const QWER_BINDINGS = {
  left: {
    key: 'ArrowLeft',
    code: 'ArrowLeft',
  },
  right: {
    key: 'ArrowRight',
    code: 'ArrowRight',
  },
  drop: {
    key: 'ArrowDown',
    code: 'ArrowDown',
  },
  rotateCW: {
    key: 'w',
    code: 'KeyW',
  },
  rotateACW: {
    key: 'e',
    code: 'KeyE',
  },
  hardDrop: {
    key: 'ArrowUp',
    code: 'ArrowUp',
  },
  hold: {
    key: 'q',
    code: 'KeyQ',
  },
  mimic: {
    key: 'r',
    code: 'keyR',
  },
  pause: {
    key: 'p',
    code: 'KeyP',
  },
};

export const getNUMPADKeyBindings = () => JSON.parse(JSON.stringify(NUMPAD_BINDINGS));
export const getQWERKeyBindings = () => JSON.parse(JSON.stringify(QWER_BINDINGS));

// Modes
export const NUMPAD_MODE = 'Numeric Keypad';
export const QWER_MODE = 'QWER + Arrows';
export const CUSTOM_MODE = 'Custom';

export const keyBindingsModes = [
  NUMPAD_MODE,
  QWER_MODE,
  CUSTOM_MODE,
];
