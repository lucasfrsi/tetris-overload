import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'assets/icon.png';

import { SkillIcon } from './style';

const Skill = ({ state, setState, levelUpSkill, exp }) => {
  const {
    currentLevel,
    name,
    onCooldown,
    active,
    expCost,
  } = state;

  return (
    <SkillIcon
      type="button"
      onClick={() => levelUpSkill(state, setState)}
      state={state}
      exp={exp}
    >
      <img src={Icon} alt="skill_icon" />
      <span>{currentLevel}/{expCost.length - 1}</span>
      <span>{name}</span>
    </SkillIcon>
  );
};

Skill.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  levelUpSkill: PropTypes.func.isRequired,
};

export default Skill;
