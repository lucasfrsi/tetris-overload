import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './style';

const Countdown = ({ count }) => (
  <div css={styles.countdownWrapper}>
    <div css={styles.countdownBox}>
      {count}
    </div>
  </div>
);

Countdown.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Countdown;
