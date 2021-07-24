import { css } from 'styled-components';
import { StyledToggleButton } from '../SVGToggleButton/style';

export const optionsWrapper = css`
  position: relative;
  display: flex;
  flex-direction: column;

  max-width: 102.4rem;
  height: 100vh;
  margin: 0 auto;
`;

export const optionsTable = css`
  border-collapse: separate;
  border-spacing: 1rem 2rem;

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

    &:active {
      background-color: goldenrod;
    }
  }

  &::-moz-range-thumb {
    appearance: none;
    cursor: pointer;

    width: 1.6rem;
    height: 1.6rem;
    background-color: white;

    border: none;
    border-radius: 0;

    &:active {
      background-color: goldenrod;
    }
  }
`;

export const sliderValue = css`
  margin-left: 1rem;
  width: 9rem;
  text-align: right;
`;

export const keyBindingsTable = css`
  border-collapse: separate;
  border-spacing: 0.5rem .5rem;
  width: 97.5%;
  margin: 0 auto;

  thead tr th {
    padding: .5rem 0.5rem 0.5rem 1rem;
    text-transform: uppercase;
    font-weight: 500;
    border: 1px solid white;

    &:first-of-type {
      text-align: left;
    }
  }

  tr td:nth-of-type(1) {
    padding: .5rem 0.5rem 0.5rem 1rem;
    width: 40%;
    text-transform: uppercase;
  }

  tr td:nth-of-type(2) {
    width: 30%;
  }

  tr td:nth-of-type(2),
  tr td:nth-of-type(3) {
    text-align: center;
  }

  tbody tr:hover {
    cursor: pointer;
    color: goldenrod;
  }
`;

export const finalButtons = css`
  display: flex;
  justify-content: space-between;
  margin: 3rem 1.5%;
`;
