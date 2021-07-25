import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { VO_1, VO_2, VO_3, VO_GO } from 'utils/SFXPaths';
import * as styles from './style';

const Countdown = ({ count, playSFX }) => {
  const countMap = useRef({
    3: VO_3,
    2: VO_2,
    1: VO_1,
    0: VO_GO,
  });

  useEffect(() => {
    if (count !== null && count <= 3) playSFX(countMap.current[count]);
  }, [count, countMap, playSFX]);

  return (
    <div css={styles.countdownWrapper}>
      <div css={styles.countdownBox}>
        <span css={styles.countdownAnimated} key={count}>
          {(count === null) ? null : (count || 'GO!')}
        </span>
      </div>
    </div>
  );
};

Countdown.propTypes = {
  count: PropTypes.number,
  playSFX: PropTypes.func.isRequired,
};

Countdown.defaultProps = {
  count: null,
};

export default Countdown;
