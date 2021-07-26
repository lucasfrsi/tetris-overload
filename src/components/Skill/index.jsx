import React from 'react';
import PropTypes from 'prop-types';
import icons from 'utils/skillsMap';
import * as styles from './style';

const Skill = ({ skill, canSkillBeLeveled, levelUpSkill }) => {
  const {
    name,
    expCost,
    onCooldown,
    currentLevel,
    passive,
  } = skill;

  let status;
  if (currentLevel === 0) {
    status = '#333';
  } else if (onCooldown === true) {
    status = '#FF4500';
  } else if (passive) {
    status = '#FFF9E3';
  } else {
    status = '#6CBB3C';
  }

  return (
    <div
      css={styles.skill}
      onClick={(e) => {
        levelUpSkill(name);
        e.currentTarget.blur();
      }}
      role="presentation"
      tabIndex={-1}
    >
      <span css={styles.skillName}>{name}</span>
      <img src={icons[name]} alt={name} css={styles.skillIcon} />
      <div css={styles.skillLevelWrapper}>
        <span css={styles.skillLevel}>{currentLevel}</span>
      </div>
      <div css={styles.skillStatusWrapper}>
        <styles.skillStatus status={status} />
        <span css={styles.skillExpCost}>{expCost[currentLevel + 1]}</span>
      </div>
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
    onCooldown: PropTypes.bool,
    currentLevel: PropTypes.number,
    passive: PropTypes.bool,
  }).isRequired,
  levelUpSkill: PropTypes.func.isRequired,
  canSkillBeLeveled: PropTypes.func.isRequired,
};

export default React.memo(Skill);
