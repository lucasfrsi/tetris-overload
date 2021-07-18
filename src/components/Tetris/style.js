import styled, { css } from 'styled-components';

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

    max-width: 23.5rem;
    width: 100%;
    margin: 0 1rem;
  }

  hr {
    border: none;
    margin: 0.75rem 0;
  }
`;

export const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledScoresWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

export const StyledSkillsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

const wrapper = css`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  border: 2px solid #333;
  width: 90%;

  span {
    text-transform: uppercase;
    margin: 0 auto 1rem;
  }
`;

export const StyledHoldWrapper = styled.div`
  ${wrapper}

  max-height: 21.15rem;
  height: 100%;
  margin: 0 auto;
`;

export const StyledNextPiecesWrapper = styled.div`
  ${wrapper}

  height: 100%;
  margin: 0 auto 1rem;
`;
