import { css } from 'styled-components';

export const getterWrapper = css`
  position: fixed;
  display: flex;
  justify-content: center;
  max-width: 102.4rem;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, .8);
  
  &:focus,
  &:active {
    outline: none;
  }

  z-index: 5000;
`;

export const getter = css`
  height: fit-content;
  margin: 14% 0 0;
  padding: 2rem;

  display: flex;
  flex-direction: column;

  border: 2px solid white;
  background-color: rgba(1, 1, 1, .4);
  backdrop-filter: blur(.2rem);
`;

export const text = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 3rem;
  text-transform: uppercase;

  table {
    width: 100%;
    margin: 1rem 0 2rem;

    tr td:nth-of-type(1) {
      text-align: right;
      width: 46%;
    }
    tr td:nth-of-type(2) {
      text-align: center;
      width: 8%;
    }
    tr td:nth-of-type(3) {
      text-align: left;
      width: 46%;
    }
  }

  i {
    text-transform: none;
    color: goldenrod;
  }
`;

export const actionStyle = css`
  color: goldenrod;
  text-transform: uppercase;
  margin: 1rem 0 2.5rem;
`;

export const inUseStyle = css`
  color: tomato;
  text-transform: none;
  font-size: 1.2rem;
`;

export const buttons = css`
  display: flex;
  justify-content: space-between;
`;
