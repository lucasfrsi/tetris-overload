import { css } from 'styled-components';
import { StyledToggleButton } from '../SVGToggleButton/style';

export const optionsWrapper = css`
  display: flex;
  flex-direction: column;

  max-width: 102.4rem;
  height: 100vh;
  margin: 0 auto;

  
  /* h1 {
    text-transform: uppercase;
    font-weight: 500;
    align-self: center;
    margin: 2rem 0 4rem;
  } */
`;

export const optionsTable = css`
  border-collapse: separate;
  border-spacing: 1rem 2rem;

  thead {
    background-color: purple;
  }

  tbody {
    background-color: violet;
  }

  th {
    font-size: 3.2rem;
    text-transform: uppercase;
    font-weight: 500;
    padding-bottom: 2rem;
  }

  tr td {
    height: 4.8rem;
  }

  tr td:first-of-type {
    text-transform: uppercase;
    padding: 1rem;
    width: 40%;
  }
`;

export const sliderWrapper = css`
  display: flex;
  align-items: center;

  ${StyledToggleButton} {
    margin-left: 1rem;
  }
`;

export const slider = css`
  appearance: none;
  width: 100%;
  height: 1.6rem;
  margin-left: 1rem;
  outline: none;

  background-color: #333;
  opacity: 0.75;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    cursor: pointer;
    

    width: 1.6rem;
    height: 1.6rem;
    background-color: white;
  }

  &::-moz-range-thumb {
    appearance: none;
    cursor: pointer;

    width: 1.6rem;
    height: 1.6rem;
    background-color: white;

    border: none;
    border-radius: 0;
  }
`;

export const sliderValue = css`
  margin-left: 1rem;
  width: 9rem;
  text-align: right;
`;

export const keyBindingsTable = css`
  width: 100%;

  thead {
    background-color: purple;
  }

  tbody {
    background-color: violet;
  }
`;
