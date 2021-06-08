import React from 'react';
import PropTypes from 'prop-types';

const Skill = ({ state, setState, levelUpSkill }) => {
  const {
    currentLevel,
    name,
    onCooldown,
    active,
  } = state;

  return (
    <div onClick={() => levelUpSkill(state, setState)} style={{
      border: '1px solid blue',
      cursor: 'pointer',
    }}>
      Name: {name}
      <br />
      Lvl: {currentLevel}
      <br />
      CD: {onCooldown || 'Ok'}
      <br />
      Active: {active || 'No'}
    </div>
  );
};

Skill.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  levelUpSkill: PropTypes.func.isRequired,
};

export default Skill;
