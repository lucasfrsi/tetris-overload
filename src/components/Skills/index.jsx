import React from 'react';
import PropTypes from 'prop-types';
import Skill from '../Skill';
import * as styles from './style';

const Skills = ({ skills, canSkillBeLeveled, levelUpSkill }) => (
  <div css={styles.skills}>
    {skills.map((skill) => (
      <Skill
        key={skill.name}
        skill={skill}
        canSkillBeLeveled={canSkillBeLeveled}
        levelUpSkill={levelUpSkill}
      />
    ))}
  </div>
);

Skills.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.object).isRequired,
  levelUpSkill: PropTypes.func.isRequired,
  canSkillBeLeveled: PropTypes.func.isRequired,
};

export default Skills;
