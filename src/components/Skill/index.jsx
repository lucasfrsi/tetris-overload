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

  let status;
  // if () {}

  return (
    <div
      css={styles.skill}
      onClick={() => levelUpSkill(name)}
      role="presentation"
      tabIndex={-1}
    >
      <span css={styles.skillName}>{name}</span>
      <img src={icons[name]} alt={name} css={styles.skillIcon} />
      <div css={styles.skillLevelWrapper}>
        <span css={styles.skillLevel}>{currentLevel}</span>
      </div>
      <div css={styles.skillStatusWrapper}>
        <span css={styles.skillStatus} />
        <span css={styles.skillExpCost}>{expCost[currentLevel + 1]}</span>
      </div>
      {/* Possible status: (Pick the colors!)
        - Not learned
        - Passive
        - Ready to be used
        - Active
        - On cooldown
      */}
      {canSkillBeLeveled(name) && <span css={styles.skillArrow} />}
    </div>
  );
};

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
