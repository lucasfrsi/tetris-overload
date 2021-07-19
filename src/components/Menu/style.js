import { css } from 'styled-components';
import { fonts } from 'style/variables';

export const menu = css`
  /* position: relative; */
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
`;

export const buttons = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    cursor: pointer;

    margin: 2rem 0;

    width: 40rem;
    background-color: transparent;
    border: 2px solid white;
    padding: 2rem;

    font-size: 3.2rem;

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

export const icons = css`
  margin: 1rem 0 0 auto;

  img {
    width: 4.8rem;
    cursor: pointer;
  }
`;

export const madeWithLove = css`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  text-transform: initial;
  font-size: 1.2rem;
  
  a {
    text-decoration: none;

    &:visited {
      color: inherit;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    width: 2.4rem;
    margin: 0 0 0 0.5rem;
  }
`;
