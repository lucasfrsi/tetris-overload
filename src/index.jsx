import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import GlobalStyle from 'style/globalStyle';
import GlobalHelmet from './globalHelmet';

import appStore from './store';

import Tetris from './components/Tetris';

const App = () => (
  <>
    <GlobalHelmet />
    <GlobalStyle />
    <Provider store={appStore}>
      <Tetris />
    </Provider>
  </>
);

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(<App />, app);
