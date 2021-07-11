import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_HOVER, BUTTON_SELECT } from 'utils/SFXPaths';

import * as styles from './style';

const SideButton = ({ buttonName, onClick, playSFX, disabled, playSFXOnClick }) => (
  <button
    type="button"
    tabIndex={-1}
    css={styles.sideButton}
    onClick={() => {
      onClick();
      if (playSFXOnClick) playSFX(BUTTON_SELECT);
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
};

SideButton.defaultProps = {
  disabled: false,
  playSFXOnClick: true,
};

export default SideButton;
