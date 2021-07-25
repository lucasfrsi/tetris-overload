import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './style';

const Pause = ({ dialog, pauseKeyBinding }) => (
  <div css={styles.backdrop}>
    <span css={styles.main}>PAUSED</span>
    {!dialog && <span css={styles.sub}>Press &quot;{pauseKeyBinding}&quot; to resume</span>}
  </div>
);

Pause.propTypes = {
  dialog: PropTypes.bool.isRequired,
  pauseKeyBinding: PropTypes.string.isRequired,
};

export default Pause;
