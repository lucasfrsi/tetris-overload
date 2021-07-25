import React from 'react';
import PropTypes from 'prop-types';
import Skill from '../Skill';
import * as styles from './style';

const Skills = ({ skills, canSkillBeLeveled, levelUpSkill }) => (
  <div css={styles.skills}>
    {skills.map((skill, index) => {
      const previousSkill = skills[index - 1];
      let shouldSkillBeRendered = false;
      if (previousSkill === undefined || previousSkill.currentLevel >= 1) {
        shouldSkillBeRendered = true;
      }

      return shouldSkillBeRendered ? (
        <Skill
          key={skill.name}
          skill={skill}
          canSkillBeLeveled={canSkillBeLeveled}
          levelUpSkill={levelUpSkill}
        />
      ) : null;
    })}
  </div>
);

Skills.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.object).isRequired,
  levelUpSkill: PropTypes.func.isRequired,
  canSkillBeLeveled: PropTypes.func.isRequired,
};

export default Skills;
