import { css } from 'styled-components';
import { colors } from 'style/variables';

export const sideButton = css`
  cursor: pointer;
  z-index: 1500;

  background-color: transparent;
  border: 2px solid #333;

  margin: 1rem auto;
  padding: 1rem;
  
  width: 90%;

  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    border-color: goldenrod;
  }

  &:disabled {
    border: 2px solid #222;
    color: ${colors['grey-d-6']};
    cursor: default;
  }

  &:disabled &:hover {
    border: 2px solid #222;
  }
`;
