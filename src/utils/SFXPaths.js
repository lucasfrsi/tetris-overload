import buttonHover from 'assets/sfx/button_hover.wav';
import buttonSelect from 'assets/sfx/button_select.ogg';
import buttonToggle from 'assets/sfx/button_toggle.ogg';

import tetrominoRotate from 'assets/sfx/tetromino_rotate.wav';
import tetrominoMerge from 'assets/sfx/tetromino_merge.wav';
import tetrominoMove from 'assets/sfx/tetromino_move.wav';

import pauseIn from 'assets/sfx/pause_in.wav';
import pauseOut from 'assets/sfx/pause_out.wav';

export const BUTTON_HOVER = 'BUTTON_HOVER';
export const BUTTON_SELECT = 'BUTTON_SELECT';
export const BUTTON_TOGGLE = 'BUTTON_TOGGLE';

export const TETROMINO_ROTATE = 'TETROMINO_ROTATE';
export const TETROMINO_MERGE = 'TETROMINO_MERGE';
export const TETROMINO_MOVE = 'TETROMINO_MOVE';

export const PAUSE_IN = 'PAUSE_IN';
export const PAUSE_OUT = 'PAUSE_OUT';

export default {
  // MENU
  [BUTTON_HOVER]: buttonHover,
  [BUTTON_SELECT]: buttonSelect,
  [BUTTON_TOGGLE]: buttonToggle,
  // TETROMINOS
  [TETROMINO_ROTATE]: tetrominoRotate,
  [TETROMINO_MERGE]: tetrominoMerge,
  [TETROMINO_MOVE]: tetrominoMove,
  // SKILLS
  // GAME
  [PAUSE_IN]: pauseIn,
  [PAUSE_OUT]: pauseOut,
};

/*
  SFX List
  == TETRIS ==
  - Skills
    - Pixel Pocket
    - Mimic
    - Blink
    - Time Stop
    - Perfectionism

    - Try to activate while on cooldown
    - CoolDown is over
    - Ability learned
    - Enough EXP to spend (?)

  - Game
    - Initial countdown and start
    - Game Over
    - Rows cleared (separate sounds for: 1, 2, 3 or 4 rows cleared)
*/

/*
  CREDITS:
  - kenney
  - The Essential Retro Video Game Sound Effects Collection [512 sounds]
*/
