import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const StyledTetrisLayout = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 144rem;
  height: 100%;

  aside {
    display: flex;
    flex-direction: column;

    max-width: 25rem;
    width: 100%;
    margin: 0 1rem;
  }

  hr {
    border: none;
    margin: 0.75rem 0;
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Scores = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;
