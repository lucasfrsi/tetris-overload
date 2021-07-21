import React from 'react';
import PropTypes from 'prop-types';

const Picker = ({ state, changeState, possibleStates }) => {
  const currentChoice = state;
  const currentChoicePosition = possibleStates.indexOf(currentChoice);
  const choicesLength = possibleStates.length;

  const onClickHandler = (side) => {
    if ((side === 'left') && (currentChoicePosition > 0)) {
      changeState(possibleStates[currentChoicePosition - 1]);
    } else if ((side === 'right') && (currentChoicePosition < choicesLength - 1)) {
      changeState(possibleStates[currentChoicePosition + 1]);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => onClickHandler('left')}
        disabled={currentChoicePosition === 0}
      >
        &lt;
      </button>
      {currentChoice}
      <button
        type="button"
        onClick={() => onClickHandler('right')}
        disabled={currentChoicePosition === choicesLength - 1}
      >
        &gt;
      </button>
    </div>
  );
};

Picker.propTypes = {
  state: PropTypes.string.isRequired,
  changeState: PropTypes.func.isRequired,
  possibleStates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Picker;
