import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'assets/icon.png';

import * as styles from './style';

const Skill = ({ state, setState, levelUpSkill, exp }) => {
  const {
    currentLevel,
    name,
    onCooldown,
    active,
    expCost,
  } = state;

  return (
    <styles.SkillIcon
      type="button"
      onClick={() => levelUpSkill(state, setState)}
      state={state}
      exp={exp}
    >
      <img src={Icon} alt="skill_icon" />
      <span css={styles.skillLvl}>{currentLevel}/{expCost.length - 1}</span>
      <span css={styles.skillName}>{name}</span>
    </styles.SkillIcon>
  );
};

Skill.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  levelUpSkill: PropTypes.func.isRequired,
};

export default Skill;
