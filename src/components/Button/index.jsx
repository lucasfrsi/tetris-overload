import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_HOVER, BUTTON_SELECT } from 'utils/SFXPaths';
import { StyledButton } from './style';

const Button = ({ name, onClick, disabled, playSFX }) => {
  const onClickHandler = () => {
    onClick();
    playSFX(BUTTON_SELECT);
  };

  return (
    <StyledButton
      type="button"
      disabled={disabled}
      onClick={onClickHandler}
      onMouseEnter={() => playSFX(BUTTON_HOVER)}
      tabIndex={-1}
    >
      {name}
    </StyledButton>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  playSFX: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  playSFX: () => {},
};

export default Button;
