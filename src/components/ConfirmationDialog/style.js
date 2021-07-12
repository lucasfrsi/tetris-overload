import { css } from 'styled-components';

export const dialogBoxWrapper = css`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2000;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: rgba(1, 1, 1, .5);
`;

export const dialogBox = css`
  display: flex;
  flex-direction: column;

  width: 45vh;
  margin: 41vh 0;

  border: 2px solid white;
  padding: 2rem;
  background-color: black;

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    text-transform: uppercase;
    min-width: 12rem;
    padding: 1rem;

    &:hover {
      color: gold;
    }

    &:first-of-type {
      margin-right: 4rem;
    }
  }
`;

export const dialogText = css`
  text-align: justify;
  line-height: 1.4;
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

export const buttonsWrapper = css`
  display: flex;
  justify-content: center;
`;
