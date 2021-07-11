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
import skillError from 'assets/sfx/skill_error.wav';
import timeStopActivated from 'assets/sfx/time_stop_activated.wav';
import timeStopDown from 'assets/sfx/time_stop_down.wav';
import timeStopUp from 'assets/sfx/time_stop_up.wav';
import mimic from 'assets/sfx/mimic.wav';
import pixelPocket from 'assets/sfx/pixel_pocket.wav';
import perfectionism from 'assets/sfx/clear_tetris_old.mp3';

import pauseIn from 'assets/sfx/pause_in.wav';
import pauseOut from 'assets/sfx/pause_out.wav';
import gameOver from 'assets/sfx/game_over.wav';
import clearSingle from 'assets/sfx/clear_single.wav';
import clearDouble from 'assets/sfx/clear_double.wav';
import clearTriple from 'assets/sfx/clear_triple.wav';
import clearTetris from 'assets/sfx/clear_tetris_new.wav';

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
export const SKILL_ERROR = 'SKILL_ERROR';
export const TIME_STOP_ACTIVATED = 'TIME_STOP_ACTIVATED';
export const TIME_STOP_DOWN = 'TIME_STOP_DOWN';
export const TIME_STOP_UP = 'TIME_STOP_UP';
export const MIMIC = 'MIMIC';
export const PIXEL_POCKET = 'PIXEL_POCKET';
export const PERFECTIONISM = 'PERFECTIONISM';

export const PAUSE_IN = 'PAUSE_IN';
export const PAUSE_OUT = 'PAUSE_OUT';
export const GAME_OVER = 'GAME_OVER';
export const CLEAR_SINGLE = 'CLEAR_SINGLE';
export const CLEAR_DOUBLE = 'CLEAR_DOUBLE';
export const CLEAR_TRIPLE = 'CLEAR_TRIPLE';
export const CLEAR_TETRIS = 'CLEAR_TETRIS';

export const VO_GAME_OVER = 'VO_GAME_OVER';
export const VO_CONGRATULATIONS = 'VO_CONGRATULATIONS';
export const VO_NEW_HIGHSCORE = 'VO_NEW_HIGHSCORE';
export const VO_LEVEL_UP = 'VO_LEVEL_UP';

export default {
  // MENU
  [BUTTON_HOVER]: buttonHover, // ok
  [BUTTON_SELECT]: buttonSelect, // ok
  [BUTTON_TOGGLE]: buttonToggle, // ok
  // TETROMINOS
  [TETROMINO_ROTATE]: tetrominoRotate, // ok
  [TETROMINO_MERGE]: tetrominoMerge, // ok
  [TETROMINO_MOVE]: tetrominoMove, // ok
  // SKILLS
  [SKILL_EXP_ENOUGH]: skillExpEnough,
  [SKILL_ON_COOLDOWN]: skillOnCooldown,
  [SKILL_LEARNED]: skillLearned,
  [SKILL_IS_UP]: skillIsUp,
  [SKILL_ERROR]: skillError,
  [TIME_STOP_ACTIVATED]: timeStopActivated,
  [TIME_STOP_DOWN]: timeStopDown,
  [TIME_STOP_UP]: timeStopUp,
  [MIMIC]: mimic,
  [PIXEL_POCKET]: pixelPocket,
  [PERFECTIONISM]: perfectionism,
  // GAME
  [PAUSE_IN]: pauseIn, // ok
  [PAUSE_OUT]: pauseOut, // ok
  [GAME_OVER]: gameOver,
  [CLEAR_SINGLE]: clearSingle,
  [CLEAR_DOUBLE]: clearDouble,
  [CLEAR_TRIPLE]: clearTriple,
  [CLEAR_TETRIS]: clearTetris,
  // VOICE
  1: one, // ok
  2: two, // ok
  3: three, // ok
  0: go, // ok
  [VO_GAME_OVER]: gameOverVO,
  [VO_CONGRATULATIONS]: congratulationsVO,
  [VO_NEW_HIGHSCORE]: newHighscoreVO,
  [VO_LEVEL_UP]: levelUpVO,
};

// pixelpocket can only be used ONCE per piece falling
// once it is used, a piece need to merge for it to be reusable again

/*
  CREDITS:
  - kenney
  - The Essential Retro Video Game Sound Effects Collection [512 sounds]
  - perfectionism: classic tetris clear sound
  - clear sounds: tetris 99 (nintendo switch)
  */
