import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_TOGGLE } from 'utils/SFXPaths';
import { StyledSVG, StyledToggleButton } from './style';

const SVGToggleButton = ({ state, SVGOn, SVGOff, altOn, altOff, toggleAction, playSFX }) => {
  const onClickHandler = () => {
    playSFX(BUTTON_TOGGLE);
    toggleAction();
  };

  return (
    <StyledToggleButton type="button" onClick={onClickHandler} tabIndex={-1}>
      <StyledSVG
        src={state ? SVGOn : SVGOff}
        alt={state ? altOn : altOff}
        draggable={false}
      />
    </StyledToggleButton>
  );
};

SVGToggleButton.propTypes = {
  state: PropTypes.bool.isRequired,
  SVGOn: PropTypes.string.isRequired,
  SVGOff: PropTypes.string.isRequired,
  toggleAction: PropTypes.func.isRequired,
  playSFX: PropTypes.func.isRequired,
  altOn: PropTypes.string,
  altOff: PropTypes.string,
};

SVGToggleButton.defaultProps = {
  altOn: 'on',
  altOff: 'off',
};

export default SVGToggleButton;
