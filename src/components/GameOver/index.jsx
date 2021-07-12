import React from 'react';
import * as styles from './style';

const GameOver = () => (
  <div css={styles.gameOverWrapper}>
    <div css={styles.gameOverBox}>
      <p><span>Game</span> <span>Over</span></p>
    </div>
  </div>
);

export default GameOver;
