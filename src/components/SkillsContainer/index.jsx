/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Skill from '../Skill';

const Skills = ({ skillsAPI }) => (
  <div>
    <h1>Skills</h1>
    {Object.entries(skillsAPI.skills).map((skill) => {
      const key = skill[0];
      const { state, setState } = skill[1];
      const {
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
        />
      );
    })}
    {console.log(skillsAPI)}
  </div>
);

Skills.propTypes = {
  skillsAPI: PropTypes.object.isRequired,
};

export default Skills;
