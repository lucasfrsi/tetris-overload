/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';
import { StyledPieceHolder } from './style';

const PieceHolder = ({ pieceHolderStage }) => (
  pieceHolderStage ? (
    <StyledPieceHolder width={pieceHolderStage[0].length} height={pieceHolderStage.length}>
      {pieceHolderStage.map((row) => row.map((cell, x) => <Cell key={x} type={cell} />))}
    </StyledPieceHolder>
  ) : null
);

PieceHolder.propTypes = {
  pieceHolderStage: PropTypes.arrayOf(PropTypes.array),
};

PieceHolder.defaultProps = {
  pieceHolderStage: null,
};

export default PieceHolder;
