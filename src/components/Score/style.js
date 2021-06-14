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

  background-image: repeating-linear-gradient(45deg, violet, indigo, blue, green, yellow, orange, red, violet);
  background-size: 800% 800%;
  /* background-clip: text; */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow 8s ease infinite;
  text-transform: uppercase;
  font-size: 2rem;

  @keyframes rainbow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 25%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const Value = styled.span`
  color: white;
  font-size: 1.8rem;
`;
