import { css } from 'styled-components';

export const sideButton = css`
  cursor: pointer;

  background-color: transparent;
  border: 2px solid #333;

  margin: 1rem auto;
  padding: 1rem;
  
  width: 90%;

  text-transform: uppercase;

  &:hover {
    border-color: goldenrod;
  }
`;
