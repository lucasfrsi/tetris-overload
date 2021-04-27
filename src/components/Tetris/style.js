import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetrisLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4rem;
  margin: 0 auto;

  max-width: 144rem;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
