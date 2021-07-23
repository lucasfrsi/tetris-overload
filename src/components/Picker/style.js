import styled from 'styled-components';

export const StyledPicker = styled.div`
  display: flex;
  align-items: center;

  button {
    cursor: pointer;
    background-color: transparent;
    outline: none;
    border: none;
    padding: .8rem;

    &:nth-of-type(1) {
      margin-right: auto;
    }

    &:nth-of-type(2) {
      margin-left: auto;
    }

    &:disabled {
      cursor: default;
      color: #333;
    }

    &:hover {
      color: goldenrod;

      &:disabled {
        color: #333;
      }
    }
  }
`;
