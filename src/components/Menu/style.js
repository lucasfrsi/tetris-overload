import { css } from 'styled-components';
import { fonts } from 'style/variables';

export const menu = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 144rem;
  height: 100vh;
  margin: 0 auto;

  font-family: ${fonts.secondary};
  color: white;
  text-transform: uppercase;

  img {
    width: 5rem;
    user-select: none;
  }

  button {
    cursor: pointer;

    margin: 2rem 0;

    width: 40rem;
    background-color: transparent;
    border: 2px solid white;
    padding: 2rem;

    font-size: 4rem;

    &:hover {
      border: 2px solid goldenrod;
    }

    &:nth-of-type(odd) {
      transform: rotate(3deg);
    }

    &:nth-of-type(even) {
      transform: rotate(-3deg);
    }
  }
`;

export const title = css`
  text-align: center;
  font-size: 8rem;
  
  &:nth-of-type(2) {
    margin-bottom: 8rem;
  }
`;
