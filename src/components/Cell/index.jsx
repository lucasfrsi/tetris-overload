import React from 'react';
import PropTypes from 'prop-types';
import { TETROMINOS } from 'utils/tetrominos';
import { StyledCell } from './style';

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color}>
    {console.log('rerender cell')}
  </StyledCell>
);

Cell.propTypes = {

};

export default React.memo(Cell);
