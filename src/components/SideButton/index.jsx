import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_HOVER, BUTTON_SELECT } from 'utils/SFXPaths';

import * as styles from './style';

const SideButton = ({ buttonName, onClick, playSFX }) => (
  <button
    type="button"
    css={styles.sideButton}
    onClick={() => {
      onClick();
      playSFX(BUTTON_SELECT);
    }}
    onMouseEnter={() => playSFX(BUTTON_HOVER)}
  >
    { buttonName }
  </button>
);

SideButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  playSFX: PropTypes.func.isRequired,
};

export default SideButton;
