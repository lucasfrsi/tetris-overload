import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_TOGGLE } from 'utils/SFXPaths';
import { StyledPicker } from './style';

const Picker = ({ state, changeState, possibleStates, playSFX }) => {
  const currentChoice = state;
  const currentChoicePosition = possibleStates.indexOf(currentChoice);
  const choicesLength = possibleStates.length;

  const onClickHandler = (side) => {
    if ((side === 'left') && (currentChoicePosition > 0)) {
      changeState(possibleStates[currentChoicePosition - 1]);
    } else if ((side === 'right') && (currentChoicePosition < choicesLength - 1)) {
      changeState(possibleStates[currentChoicePosition + 1]);
    }
    playSFX(BUTTON_TOGGLE);
  };

  return (
    <StyledPicker>
      <button
        type="button"
        onClick={() => onClickHandler('left')}
        tabIndex={-1}
        disabled={currentChoicePosition === 0}
      >
        &lt;
      </button>
      <span>{currentChoice}</span>
      <button
        type="button"
        onClick={() => onClickHandler('right')}
        tabIndex={-1}
        disabled={currentChoicePosition === choicesLength - 1}
      >
        &gt;
      </button>
    </StyledPicker>
  );
};

Picker.propTypes = {
  state: PropTypes.string.isRequired,
  changeState: PropTypes.func.isRequired,
  possibleStates: PropTypes.arrayOf(PropTypes.string).isRequired,
  playSFX: PropTypes.func.isRequired,
};

export default Picker;
