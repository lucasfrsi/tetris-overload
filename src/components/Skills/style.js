import { css } from 'styled-components';

export const skills = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1rem;
  height: 100%;

  @media screen and (max-height: 768px) {
    margin-top: 0;
  }
`;
