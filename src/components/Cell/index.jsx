import React from 'react';
import PropTypes from 'prop-types';
import { TETROMINOS } from 'utils/tetrominos';
import { StyledCell } from './style';

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type }) => (
  <StyledCell
    type={type[0]}
    color={TETROMINOS[type[0]].color}
    highlight={type[2]}
  />
);

Cell.propTypes = {
  type: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default React.memo(Cell);
