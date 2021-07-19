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
  background-color: rgba(1, 1, 1, .3);

  
`;

export const buttonsWrapper = css`
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

export const dialogText = css`
  text-align: justify;
  line-height: 1.4;
  font-size: 1.4rem;
  margin-bottom: 3rem;
`;
