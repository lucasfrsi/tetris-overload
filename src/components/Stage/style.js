import styled from 'styled-components';

export const StyledStage = styled.div`
  display: grid;
  /* Props: height = 20 (rows) | width = 10 (cols) */
  /* Rows: Get the height, divided by the amount of rows - 1px of the gap */
  grid-template-rows: repeat(${(props) => props.height}, calc(100% / ${(props) => props.height} - 1px));
  grid-template-columns: repeat(${(props) => props.width}, calc(100vh / ${(props) => props.height} - 1px));
  grid-gap: 1px;
  border: 2px solid #333;
  background: #111;
`;
