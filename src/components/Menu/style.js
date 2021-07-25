import { css } from 'styled-components';
import { colors } from 'style/variables';

export const menu = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 144rem;
  height: 100vh;
  margin: 0 auto;

  color: white;
  text-transform: uppercase;
`;

export const menuOptions = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const buttons = css`
  ${menuOptions}

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

    &:nth-of-type(3) {
      border: 2px solid #222;
      color: ${colors['grey-d-6']};
      cursor: default;
      text-decoration: line-through;

      &:hover {
        border: 2px solid #222;
      }

      span {
        font-size: 1.6rem;
        color: ${colors['black-1']};
        position: absolute;
        bottom: .5rem;
        right: .5rem;
      }
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
`;

export const madeWithLove = css`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  text-transform: initial;
  font-size: 1.2rem;
  
  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    width: 24px;
    margin: 0 0 0 0.5rem;
  }
`;
