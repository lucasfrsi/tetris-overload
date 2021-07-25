import styled from 'styled-components';

export const StyledToggleButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const StyledSVG = styled.img`
  width: 48px;

  @media screen and (max-height: 730px) {
    width: 32px;
  }
`;
