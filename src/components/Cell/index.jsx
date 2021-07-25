import React from 'react';
import PropTypes from 'prop-types';
import { TETROMINOS } from 'utils/tetrominos';
import { StyledCell } from './style';

const Cell = ({ type }) => (
  <StyledCell
    type={type[0]}
    color={TETROMINOS[type[0]].color}
    highlight={type[2]}
  />
);

Cell.propTypes = {
  type: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ])).isRequired,
};

// React.memo makes sure only changed cells are re-rendered
export default React.memo(Cell);
