import { css } from 'styled-components';

export const highScoresWrapper = css`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  z-index: 2000;
  text-transform: uppercase;
`;

export const highScoresBox = css`
  display: flex;
  flex-direction: column;
  margin: auto 0;

  border: 2px solid #333;
  background-color: rgba(1, 1, 1, .8);
  padding: 2rem;

  animation: 0.5s ease-in-out showFromBehind;

  @keyframes showFromBehind {
    0% {
      opacity: 0;
      transform: scale(0);
    }

    60% {
      opacity: 1;
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }
`;

export const newHighScoreBox = css`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  span {
    font-size: 2.4rem;
    font-weight: 700;
    color: gold;
  }
`;

export const highScoresTable = css`
  border: 2px solid #222;
  margin-bottom: 2rem;
  min-width: 42vh;

  th, td {
    padding: .5rem;
  }

  th {
    font-size: 1.6rem;
    font-weight: 500;
    border: 2px solid #555;
    background-color: rgba(255, 255, 255, .2);
  }

  td {
    border: 2px solid transparent;
    background-color: rgba(255, 255, 255, .1);
  }

  tr td:nth-child(1) {
    width: 100%;
  }

  tr td:nth-child(2) {
    font-size: 1.2rem;
  }
`;

export const highScoresButtons = css`
  display: flex;
  justify-content: space-between;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    line-height: 2.2;

    &:hover {
      color: gold;
    }
  }
`;
