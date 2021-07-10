import { css } from 'styled-components';

export const dialogBoxWrapper = css`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1001;

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

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    text-transform: uppercase;

    &:hover {
      color: gold;
    }

    &:first-of-type {
      margin-right: auto;
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
`;
