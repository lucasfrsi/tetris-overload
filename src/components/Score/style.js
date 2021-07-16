import styled from 'styled-components';
import { fonts } from 'style/variables';

export const StyledScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 2rem auto;
  padding: 1rem;
  border: 2px solid #333;
  width: 90%;

  font-family: ${fonts.secondary};
`;

export const Title = styled.span`
  margin: 0 0 1rem;
  color: white;
  text-transform: uppercase;
  /* font-size: 1.6rem; */
  `;

export const Value = styled.span`
  color: white;
  /* font-size: 1.8rem; */
`;
