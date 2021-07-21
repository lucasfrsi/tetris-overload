import { css } from 'styled-components';

export const getterWrapper = css`
  &:focus,
  &:active {
    outline: none;
    border: 1px solid red;
  }
`;
