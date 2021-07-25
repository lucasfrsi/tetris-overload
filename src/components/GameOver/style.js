import { css } from 'styled-components';

export const gameOverWrapper = css`
  position: absolute;
  width: 100%;
`;

export const gameOverBox = css`
  display: flex;
  justify-content: center;
  margin: 20.5vh 0 0;

  text-transform: uppercase;
`;

export const gameOverSpan = css`
  display: inline-block;
  font-size: 4.2rem;
  text-shadow: 0 0 2rem black;

  &:first-of-type {
    animation: 0.5s ease-in-out gameOverAnimation;
  }

  &:nth-of-type(2) {
    animation: 0.5s ease-in-out gameOverAnimation;
    animation-delay: 0.5s;
    opacity: 0;
    animation-fill-mode: forwards;
  }

  @keyframes gameOverAnimation {
    0% {
      transform: translateX(5rem);
      opacity: 0;
    }

    60% {
      transform: translateX(-1rem);
    }

    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
