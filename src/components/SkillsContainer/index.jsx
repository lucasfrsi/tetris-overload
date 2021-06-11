/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Skill from '../Skill';

const Skills = ({ skillsAPI }) => (
  <div>
    {Object.entries(skillsAPI.skills).map((skill) => {
      const key = skill[0];
      const { state, setState } = skill[1];
      const {
        state: {
          exp,
        },
        actions: {
          levelUpSkill,
        },
      } = skillsAPI;

      return (
        <Skill
          key={key}
          state={state}
          setState={setState}
          levelUpSkill={levelUpSkill}
          exp={exp}
        />
      );
    })}
  </div>
);

Skills.propTypes = {
  skillsAPI: PropTypes.object.isRequired,
};

export default Skills;
