import { combineReducers } from 'redux';
import tetrisReducer from './tetris';

const rootReducer = combineReducers({
  tetris: tetrisReducer,
});

export default rootReducer;
