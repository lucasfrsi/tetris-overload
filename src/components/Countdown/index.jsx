import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as styles from './style';

const Countdown = ({ count, playSFX }) => {
  useEffect(() => {
    if (count !== null && count <= 3) playSFX(count);
  }, [count, playSFX]);

  return (
    <div css={styles.countdownWrapper}>
      <div css={styles.countdownBox}>
        {/* Improve logic below? '-' */}
        <span key={count}>{(count === null) ? null : (count || 'GO!')}</span>
      </div>
    </div>
  );
};

Countdown.propTypes = {
  count: PropTypes.number.isRequired,
  playSFX: PropTypes.func.isRequired,
};

export default Countdown;
