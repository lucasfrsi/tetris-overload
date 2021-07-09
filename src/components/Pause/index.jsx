import React from 'react';
import * as styles from './style';

const Pause = () => (
  <div css={styles.backdrop}>
    <span css={styles.main}>PAUSED</span>
    <span css={styles.sub}>Press &quot;P&quot; to resume</span>
  </div>
);

export default Pause;
