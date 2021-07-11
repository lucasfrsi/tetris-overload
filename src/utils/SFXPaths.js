import buttonHover from 'assets/sfx/button_hover.wav';
import buttonSelect from 'assets/sfx/button_select.ogg';
import buttonToggle from 'assets/sfx/button_toggle.ogg';

import tetrominoRotate from 'assets/sfx/tetromino_rotate.wav';
import tetrominoMerge from 'assets/sfx/tetromino_merge.wav';
import tetrominoMove from 'assets/sfx/tetromino_move.wav';

import skillExpEnough from 'assets/sfx/skill_exp_enough.wav';
import skillOnCooldown from 'assets/sfx/skill_on_cooldown.wav';
import skillLearned from 'assets/sfx/skill_learned.flac';
import skillIsUp from 'assets/sfx/skill_is_up.ogg';
import timeStopActivated from 'assets/sfx/time_stop_activated.wav';
import timeStopDown from 'assets/sfx/time_stop_down.wav';
import timeStopUp from 'assets/sfx/time_stop_up.wav';
import mimic from 'assets/sfx/mimic.wav';
import pixelPocket from 'assets/sfx/pixel_pocket.wav';

import pauseIn from 'assets/sfx/pause_in.wav';
import pauseOut from 'assets/sfx/pause_out.wav';
import gameOver from 'assets/sfx/game_over.wav';

import one from 'assets/sfx/1.ogg';
import two from 'assets/sfx/2.ogg';
import three from 'assets/sfx/3.ogg';
import go from 'assets/sfx/go.ogg';
import gameOverVO from 'assets/sfx/game_over_vo.ogg';
import congratulationsVO from 'assets/sfx/congratulations.ogg';
import newHighscoreVO from 'assets/sfx/new_highscore.ogg';
import levelUpVO from 'assets/sfx/level_up.ogg';

export const BUTTON_HOVER = 'BUTTON_HOVER';
export const BUTTON_SELECT = 'BUTTON_SELECT';
export const BUTTON_TOGGLE = 'BUTTON_TOGGLE';

export const TETROMINO_ROTATE = 'TETROMINO_ROTATE';
export const TETROMINO_MERGE = 'TETROMINO_MERGE';
export const TETROMINO_MOVE = 'TETROMINO_MOVE';

export const SKILL_EXP_ENOUGH = 'SKILL_EXP_ENOUGH';
export const SKILL_ON_COOLDOWN = 'SKILL_ON_COOLDOWN';
export const SKILL_LEARNED = 'SKILL_LEARNED';
export const SKILL_IS_UP = 'SKILL_IS_UP';
export const TIME_STOP_ACTIVATED = 'TIME_STOP_ACTIVATED';
export const TIME_STOP_DOWN = 'TIME_STOP_DOWN';
export const TIME_STOP_UP = 'TIME_STOP_UP';
export const MIMIC = 'MIMIC';
export const PIXEL_POCKET = 'PIXEL_POCKET';

export const PAUSE_IN = 'PAUSE_IN';
export const PAUSE_OUT = 'PAUSE_OUT';
export const GAME_OVER = 'GAME_OVER';

export const VO_GAME_OVER = 'VO_GAME_OVER';
export const VO_CONGRATULATIONS = 'VO_CONGRATULATIONS';
export const VO_NEW_HIGHSCORE = 'VO_NEW_HIGHSCORE';
export const VO_LEVEL_UP = 'VO_LEVEL_UP';

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
  [SKILL_EXP_ENOUGH]: skillExpEnough,
  [SKILL_ON_COOLDOWN]: skillOnCooldown,
  [SKILL_LEARNED]: skillLearned,
  [SKILL_IS_UP]: skillIsUp,
  [TIME_STOP_ACTIVATED]: timeStopActivated,
  [TIME_STOP_DOWN]: timeStopDown,
  [TIME_STOP_UP]: timeStopUp,
  [MIMIC]: mimic,
  [PIXEL_POCKET]: pixelPocket,
  // GAME
  [PAUSE_IN]: pauseIn,
  [PAUSE_OUT]: pauseOut,
  [GAME_OVER]: gameOver,
  // VOICE
  1: one,
  2: two,
  3: three,
  0: go,
  [VO_GAME_OVER]: gameOverVO,
  [VO_CONGRATULATIONS]: congratulationsVO,
  [VO_NEW_HIGHSCORE]: newHighscoreVO,
  [VO_LEVEL_UP]: levelUpVO,
};

/*
  == TETRIS ==
  - Skills
    - Perfectionism

  - Game
    - Rows cleared (separate sounds for: 1, 2, 3 or 4 rows cleared)
*/

// pixelpocket can only be used ONCE per piece falling
// once it is used, a piece need to merge for it to be reusable again

/*
  CREDITS:
  - kenney
  - The Essential Retro Video Game Sound Effects Collection [512 sounds]
*/
