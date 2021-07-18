import styled from 'styled-components';

export const StyledPieceHolder = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.height}, calc(100vh / 35));
  grid-template-columns: repeat(${(props) => props.width}, calc(100vh / 35));
  
  width: fit-content;
  margin: auto;
`;
