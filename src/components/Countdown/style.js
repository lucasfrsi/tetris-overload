import { css } from 'styled-components';

export const countdownWrapper = css`
  position: absolute;
  width: 100%;
`;

export const countdownBox = css`
  display: flex;
  justify-content: center;
  margin: 20vh 0 0;
`;

export const countdownAnimated = css`
  font-size: 4.8rem;
  text-shadow: 0 0 1rem black;
  animation: 1s ease-in-out countdownAnimation;

  @keyframes countdownAnimation {
    0% {
      transform: translateY(5rem);
      opacity: 0;
    }

    30% {
      transform: translateY(0);
      opacity: 1;
    }

    100% {
      transform: translateY(-5rem);
      opacity: 0;
    }
  }
`;
