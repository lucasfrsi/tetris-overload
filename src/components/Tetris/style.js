import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
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
  }
`;
