import {
  SET_INGAME,
} from './types';

export const setInGameAction = (inGame) => ({
  type: SET_INGAME,
  payload: {
    inGame,
  },
});
