import React from 'react';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';
import { StyledPieceHolder } from './style';

const PieceHolder = ({ pieceHolderStage }) => (
  <StyledPieceHolder width={pieceHolderStage[0].length} height={pieceHolderStage.length}>
    {pieceHolderStage.map((row) => row.map((cell, x) => <Cell key={x} type={cell} />))}
  </StyledPieceHolder>
);

PieceHolder.propTypes = {
  pieceHolderStage: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default PieceHolder;
