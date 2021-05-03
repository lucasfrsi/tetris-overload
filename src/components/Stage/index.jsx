/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';

import { StyledStage } from './style';

const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell} />))}
  </StyledStage>
);

Stage.propTypes = {
  stage: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Stage;
