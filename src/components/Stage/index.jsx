/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';

import { StyledStage } from './style';

const Stage = ({ stage }) => (
  // The height does not take into account the sky (index 0)
  <StyledStage width={stage[0].length} height={stage.length - 1}>
    {stage.map((row, index) => {
      // Ignore rendering the sky (index 0)
      if (index === 0) return null;
      return row.map((cell, i) => <Cell key={i} type={cell} />);
    })}
  </StyledStage>
);

Stage.propTypes = {
  stage: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Stage;
