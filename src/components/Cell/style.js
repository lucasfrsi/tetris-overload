import styled, { css } from 'styled-components';

export const StyledCell = styled.div(
  (props) => css`
    width: auto;
    border: ${props.type === 0 ? '0px solid' : '4px solid'};

    ${props.highlight
    ? css`
      background: rgba(black, 1);
      border-bottom-color: rgba(${props.color}, 0.1);
      border-right-color: rgba(${props.color}, 0.2);
      border-top-color: rgba(${props.color}, 0.2);
      border-left-color: rgba(${props.color}, 0.1);
    `
    : css`
      background: rgba(${props.color}, 0.8);
      border-bottom-color: rgba(${props.color}, 0.1);
      border-right-color: rgba(${props.color}, 1);
      border-top-color: rgba(${props.color}, 1);
      border-left-color: rgba(${props.color}, 0.3);
    `}
  `,
);
