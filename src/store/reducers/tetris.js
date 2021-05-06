import {
  SET_INGAME,
} from '../actions/types';

const initialState = {
  inGame: false,
};

const tetrisReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_INGAME:
      return {
        ...state,
        inGame: payload.inGame,
      };
    default:
      return state;
  }
};

export default tetrisReducer;
