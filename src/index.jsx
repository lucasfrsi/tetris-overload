import React from 'react';
import ReactDOM from 'react-dom';

import GlobalStyle from 'style/globalStyle';
import GlobalHelmet from './globalHelmet';

import Tetris from './components/Tetris';

const App = () => (
  <>
    <GlobalHelmet />
    <GlobalStyle />
    <Tetris />
  </>
);

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(<App />, app);
