/* eslint-disable camelcase */
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';

const composeEnhancers = (
  __webpack_devmode__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null
) || compose;

const loggerMiddleware = createLogger({
  collapsed: true,
});

const reduxMiddlewares = [];
if (__webpack_devmode__) reduxMiddlewares.push(loggerMiddleware);

const appStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...reduxMiddlewares)),
);

export default appStore;
