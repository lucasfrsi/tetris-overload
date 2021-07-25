import { createGlobalStyle } from 'styled-components';
import { colors, fonts } from 'style/variables';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;

      @media screen and (max-height: 730px) {
        font-size: 50%;
      }

      @media screen and (max-height: 635px) {
        font-size: 45%;
      }
  }

  body {
    font-family: ${fonts.secondary};
    font-size: 1.6rem;
    font-weight: 400;
    color: ${colors.white};
    background-color: black;
    user-select: none;
  }

  button,
  input,
  textarea {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }
`;

export default GlobalStyle;
