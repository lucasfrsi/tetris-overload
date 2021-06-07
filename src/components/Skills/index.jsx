/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Skills = ({ skillsAPI }) => (
  <div>
    <h1>Skills</h1>
    {Object.entries(skillsAPI.state).map(([skill, state]) => (
      <div key={skill}>
        <span>{skill}</span>
        <span>lvl:
          {(typeof state === 'object' ? state.currentLevel : state)}
        </span>
      </div>
    ))}
    {/* Easy way to check skills in browser console */}
    {console.log('Debug: ', skillsAPI)}
  </div>
);

Skills.propTypes = {
  skillsAPI: PropTypes.object.isRequired,
};

export default Skills;
