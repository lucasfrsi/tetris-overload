import { css } from 'styled-components';

export const backdrop = css`
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(1, 1, 1, 0.5);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const main = css`
  font-size: 3rem;
  margin: 36.5vh 0 2rem;
`;

export const sub = css`
  font-size: 1.5rem;
`;
