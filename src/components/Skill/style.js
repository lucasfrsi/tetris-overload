import styled from 'styled-components';

export const SkillIcon = styled.button`
  position: relative;
  display: block;
  /* border: 0 solid; */
  margin: 0 auto 1rem;
  cursor: pointer;
  background-color: transparent;

  width: 4rem;
  height: 4rem;

  /* const Skill = ({ state, setState, levelUpSkill, exp }) => {
  const {
    currentLevel,
    name,
    onCooldown,
    active,
    expCost,
  } = state; */
  border: 2px solid ${(props) => (props.exp > props.state.expCost[props.state.currentLevel + 1] ? 'green' : 'red')};
  border-radius: 50%;

  span {
    position: absolute;
    bottom: -.5rem;
    right: -.5rem;
    color: white;
    text-shadow: 0 0 0.5rem black;
    font-weight: 600;
    font-size: 1.4rem;
  }

  img {
    /* display: none; */
    width: 100%;
    height: auto;
    border-radius: 50%;
  }
`;
