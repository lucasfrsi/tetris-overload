import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_HOVER } from 'utils/SFXPaths';

import * as styles from './style';

const SideButton = ({ buttonName, onClick, playSFX, disabled }) => (
  <button
    type="button"
    tabIndex={-1}
    css={styles.sideButton}
    onClick={onClick}
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
};

SideButton.defaultProps = {
  disabled: false,
};

export default React.memo(SideButton);
