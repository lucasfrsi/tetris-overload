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

  p {
    font-size: 1.4rem;
    text-align: center;
    margin: 1rem 0 0;
  }

  margin: 0.5rem 0;
  z-index: 1000;
`;

const wrapper = css`
  position: absolute;
  background-color: black;
  border-radius: 50%;
  padding: .6rem;
`;

export const levelWrapper = css`
  ${wrapper}
  bottom: -1rem;
  left: -0.8rem;
`;

export const statusWrapper = css`
  ${wrapper}
  bottom: -0.8rem;
  right: -0.8rem;
`;

export const level = css`
  /* a */
`;

export const status = css`
  display: inline-block;

  width: 1.6rem;
  height: 1.6rem;
  background-color: purple;
  border-radius: 50%;
`;

export const expCost = css`
  position: absolute;
  font-size: 2rem;
  color: rgba(51, 51, 51, .5);

  bottom: 1rem;
  right: 2.4rem;
`;

export const arrow = css`
  position: absolute;
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
