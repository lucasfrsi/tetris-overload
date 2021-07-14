import React from 'react';
import PropTypes from 'prop-types';
import Skill from '../Skill';

const Skills = ({ skillsAPI }) => {
  const {
    actions: {
      levelUpSkill,
    },
  } = skillsAPI;

  return (
    <div onClick={() => levelUpSkill('Intuition')}>
      a
    </div>
  );
};

Skills.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  skillsAPI: PropTypes.object.isRequired,
};

export default Skills;
