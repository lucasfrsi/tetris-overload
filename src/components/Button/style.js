import styled from 'styled-components';

export const StyledButton = styled.button`
  outline: none;
  background-color: transparent;

  cursor: pointer;
  border: 1px solid #333;
  padding: 1.2rem;
  text-transform: uppercase;

  &:hover {
    border: 1px solid goldenrod;
  }

  &:disabled {
    border: 1px solid #222;
    cursor: default;
    color: #333;
  }
`;
