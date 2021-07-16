import React from 'react';
import PropTypes from 'prop-types';
import icons from 'utils/skillsMap';
import * as styles from './style';

const Skill = ({ skill, canSkillBeLeveled, levelUpSkill }) => {
  const {
    name,
    expCost,
    active,
    onCooldown,
    currentLevel,
  } = skill;

  return (
    <div
      css={styles.skill}
      onClick={() => levelUpSkill(name)}
      role="presentation"
      tabIndex={-1}
    >
      <p>{name}</p>
      <img src={icons[name]} alt={name} />
      <span css={styles.currentLevel}>{currentLevel}</span>
      <span css={styles.status} />
      {/* Possible status:
        - Not learned
        - Passive
        - Ready to be used
        - Active
        - On cooldown
      */}
      {canSkillBeLeveled(name) && <span css={styles.arrow} />}
      <span css={styles.expCost}>{expCost[currentLevel + 1]}</span>
    </div>
  );
};

// Use a wrapper div in currentLevel and Status, so that the black part
// Can be manipulated easier (and as a square)

Skill.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string,
    expCost: PropTypes.arrayOf(PropTypes.number),
    duration: PropTypes.arrayOf(PropTypes.number),
    cooldown: PropTypes.arrayOf(PropTypes.number),
    active: PropTypes.bool,
    onCooldown: PropTypes.bool,
    currentLevel: PropTypes.number,
  }).isRequired,
  levelUpSkill: PropTypes.func.isRequired,
  canSkillBeLeveled: PropTypes.func.isRequired,
};

export default Skill;
