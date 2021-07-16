import { css } from 'styled-components';

export const skill = css`
  position: relative;
  cursor: pointer;

  border: 2px solid #333;
  /* padding: .5rem; */
  /* width: fit-content; */
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;

  &:hover {
    border-color: goldenrod;
  }

  img {
    width: 4.8rem;
    margin: 0 auto;
  }

  span {
    position: absolute;
  }

  p {
    font-size: 1.4rem;
    text-align: center;
    margin: 1rem 0 0;
  }

  margin: 0.5rem 0;
  z-index: 1000;
`;

export const status = css`
  width: 2rem;
  height: 2rem;
  background-color: purple;
  border: 4px solid black;
  border-radius: 50%;

  bottom: -1rem;
  right: -1rem;
`;

export const currentLevel = css`
  bottom: -0.8rem;
  left: -0.8rem;
  /* margin: .1rem; */
  background-color: black;
  text-shadow: 0 0 0.5rem black;
`;

export const arrow = css`
  top: .5rem;
  left: -.5rem;

  width: 0; 
  height: 0; 
  border-left: 0.8rem solid transparent;
  border-right: 0.8rem solid transparent;
  
  border-bottom: 0.8rem solid greenyellow;
  animation: 1s ease-in-out upAndDown infinite;

  @keyframes upAndDown {
    0% {
      top: -.5rem;
    }

    50% {
      top: .5rem;
    }

    100% {
      top: -.5rem;
    }
  }
`;

export const expCost = css`
  font-size: 2.6rem;
  color: rgba(51, 51, 51, .5);

  align-self: center;
  bottom: 0rem;
  right: .25rem;

  z-index: -1;
`;
