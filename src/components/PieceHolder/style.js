import styled from 'styled-components';

export const StyledPieceHolder = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.height}, calc(100vh / 35));
  grid-template-columns: repeat(${(props) => props.width}, calc(100vh / 35));
  border: 2px solid #333;
  background: #111;

  margin: 0 2rem 0;
  padding: 28%;
  width: 20vw;
  height: 20vw;
  overflow: hidden;
`;
