/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';

import { StyledStage } from './style';

const Stage = ({ stage }) => {
  const visibleStage = stage.slice(1);

  return (
    <StyledStage width={visibleStage[0].length} height={visibleStage.length}>
      {visibleStage.map((row) => row.map((cell, x) => <Cell key={x} type={cell} />))}
    </StyledStage>
  );
};

Stage.propTypes = {
  stage: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Stage;
