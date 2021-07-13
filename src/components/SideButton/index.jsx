import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_HOVER, BUTTON_SELECT, BUTTON_START } from 'utils/SFXPaths';

import * as styles from './style';

const SideButton = ({ buttonName, onClick, playSFX, disabled, playSFXOnClick, start }) => (
  <button
    type="button"
    tabIndex={-1}
    css={styles.sideButton}
    onClick={() => {
      onClick();
      if (playSFXOnClick) playSFX(start ? BUTTON_START : BUTTON_SELECT);
    }}
    onMouseEnter={() => playSFX(BUTTON_HOVER)}
    disabled={disabled}
  >
    { buttonName }
  </button>
);

SideButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  playSFX: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  playSFXOnClick: PropTypes.bool,
  start: PropTypes.bool,
};

SideButton.defaultProps = {
  disabled: false,
  playSFXOnClick: true,
  start: false,
};

export default SideButton;
