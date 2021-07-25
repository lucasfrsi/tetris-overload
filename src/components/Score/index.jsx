import React from 'react';
import PropTypes from 'prop-types';

import { StyledScore, Title, Value } from './style';

const Score = ({ name, value }) => (
  <StyledScore>
    <Title>
      {name}
    </Title>
    <Value>
      {value}
    </Value>
  </StyledScore>
);

Score.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default React.memo(Score);
