import styled, { css } from 'styled-components';

export const skill = css`
  position: relative;
  cursor: pointer;
  border: 2px solid #333;

  display: flex;
  flex-direction: column;
  z-index: 1000;

  width: 90%;
  margin: 0 0 1rem;

  &:hover {
    border-color: goldenrod;
  }

  &:focus {
    outline: none;
  }
`;

export const skillName = css`
  font-size: 1.4rem;
  text-align: center;
  margin: 1rem 0 0;
`;

export const skillIcon = css`
  margin: 1rem auto;
  width: 32px;

  @media screen and (max-height: 768px) {
    margin: 1rem auto 0.5rem;
  }
`;

const wrapper = css`
  position: absolute;
  background-color: black;
  border-radius: 50%;
  padding: .6rem;
`;

export const skillLevelWrapper = css`
  ${wrapper}
  bottom: -1rem;
  left: -0.8rem;
`;

export const skillStatusWrapper = css`
  ${wrapper}
  bottom: -0.8rem;
  right: -0.8rem;
`;

export const skillLevel = css`
  /* Empty for now */
`;

export const skillStatus = styled.span`
  display: inline-block;

  width: 1.6rem;
  height: 1.6rem;
  background-color: ${(props) => props.status};
  border-radius: 50%;
`;

export const skillExpCost = css`
  position: absolute;
  font-size: 2rem;
  color: rgba(51, 51, 51, .5);

  bottom: 1rem;
  right: 2.4rem;
`;

export const skillArrow = css`
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
