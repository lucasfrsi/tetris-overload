import React from 'react';
import * as styles from './style';

const GameOver = () => (
  <div css={styles.gameOverWrapper}>
    <div css={styles.gameOverBox}>
      <p>
        <span css={styles.gameOverSpan}>Game</span> <span css={styles.gameOverSpan}>Over</span>
      </p>
    </div>
  </div>
);

export default GameOver;
