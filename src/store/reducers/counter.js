import { INCREASE_COUNTER, DECREASE_COUNTER, RESET_COUNTER } from '../actions/types';

const initialState = 0;

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_COUNTER:
      return state + 1;
    case DECREASE_COUNTER:
      return state - 1;
    case RESET_COUNTER:
      return 0;
    default:
      return state;
  }
};

export default counterReducer;
