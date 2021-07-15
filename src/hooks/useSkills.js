import { useState, useCallback, useMemo } from 'react';
import { PIXEL_POCKET, TETROMINO_MERGE, MIMIC, TIME_STOP_DOWN, TIME_STOP_UP, SKILL_ON_COOLDOWN, SKILL_LEARNED, PERFECTIONISM } from 'utils/SFXPaths';
import * as S from 'utils/skillsMap';

export const useSkills = ({ SFX_API }) => {
  const {
    actions: { playSFX },
  } = SFX_API;

  const EXP_POINTS = useMemo(() => [10, 30, 50, 70], []);

  const [exp, setExp] = useState(0);

  const [clairvoyance, setClairvoyance] = useState({
    name: S.CLAIRVOYANCE,
    expCost: [0, 50, 75, 100],
    currentLevel: 1,
  });

  const [pixelPocket, setPixelPocket] = useState({
    name: S.PIXELPOCKET,
    expCost: [0, 50],
    currentLevel: 0,
    onCooldown: false,
  });

  const [intuition, setIntuition] = useState({
    name: S.INTUITION,
    expCost: [0, 100],
    currentLevel: 0,
  });

  const [blink, setBlink] = useState({
    name: S.BLINK,
    expCost: [0, 100],
    currentLevel: 0,
  });

  const [timeStop, setTimeStop] = useState({
    name: S.TIMESTOP,
    expCost: [0, 100, 150, 200],
    duration: [0, 4, 6, 8],
    cooldown: [0, 90, 75, 60],
    active: false,
    onCooldown: false,
    currentLevel: 0,
  });

  const [mimic, setMimic] = useState({
    name: S.MIMIC,
    expCost: [0, 100, 150, 200],
    cooldown: [0, 60, 45, 30],
    onCooldown: false,
    currentLevel: 0,
  });

  const [perfectionism, setPerfectionism] = useState({
    name: S.PERFECTIONISM,
    expCost: [0, 150, 200, 250],
    cooldown: [0, 120, 90, 60],
    onCooldown: false,
    currentLevel: 0,
  });

  const calcExp = useCallback((rowsCleared) => {
    const expFormula = EXP_POINTS[rowsCleared - 1];
    setExp((prev) => prev + expFormula);
  }, [EXP_POINTS]);

  const skillsMap = useMemo(() => ({
    [S.CLAIRVOYANCE]: [clairvoyance, setClairvoyance],
    [S.PIXELPOCKET]: [pixelPocket, setPixelPocket],
    [S.MIMIC]: [mimic, setPixelPocket],
    [S.INTUITION]: [intuition, setIntuition],
    [S.BLINK]: [blink, setBlink],
    [S.TIMESTOP]: [timeStop, setTimeStop],
    [S.PERFECTIONISM]: [perfectionism, setPerfectionism],
  }), [blink, clairvoyance, intuition, mimic, perfectionism, pixelPocket, timeStop]);

  const levelUpSkill = useCallback((skillKey) => {
    const [skill, setSkill] = skillsMap[skillKey];

    const currentSkillLevel = skill.currentLevel;
    const skillMaxLevel = skill.expCost.length - 1;

    if (currentSkillLevel < skillMaxLevel) {
      const costToLevel = skill.expCost[currentSkillLevel + 1];
      if (exp > costToLevel) {
        setSkill((prev) => ({
          ...prev,
          currentLevel: prev.currentLevel + 1,
        }));
        setExp((prev) => prev - costToLevel);
        playSFX(SKILL_LEARNED);
        return;
      }
    }

    playSFX(SKILL_ON_COOLDOWN);
  }, [exp, playSFX, skillsMap]);

  const resetSkills = useCallback(() => {
    setExp(0);

    setClairvoyance((prev) => ({
      ...prev,
      currentLevel: 1,
    }));

    setPixelPocket((prev) => ({
      ...prev,
      currentLevel: 0,
      onCooldown: false,
    }));

    setIntuition((prev) => ({
      ...prev,
      currentLevel: 0,
    }));

    setBlink((prev) => ({
      ...prev,
      currentLevel: 0,
    }));

    setTimeStop((prev) => ({
      ...prev,
      currentLevel: 0,
      durationTimer: null,
      active: 0,
      cooldownTimer: null,
      onCooldown: 0,
    }));

    setMimic((prev) => ({
      ...prev,
      currentLevel: 0,
      cooldownTimer: null,
      onCooldown: 0,
    }));

    setPerfectionism((prev) => ({
      ...prev,
      currentLevel: 0,
      cooldownTimer: null,
      onCooldown: 0,
    }));
  }, []);

  const putTimeStopAsActive = () => {
    setTimeStop((prev) => ({
      ...prev,
      active: true,
    }));
  };

  const putTimeStopOnCooldown = () => {
    setTimeStop((prev) => ({
      ...prev,
      active: false,
      onCooldown: true,
    }));
  };

  const removeTimeStopCooldown = () => {
    setTimeStop((prev) => ({
      ...prev,
      onCooldown: false,
    }));
  };

  const activateTimeStop = () => {
    if (timeStop.currentLevel) {
      if (!timeStop.active && !timeStop.onCooldown) {
        putTimeStopAsActive();
        playSFX(TIME_STOP_DOWN);
      } else if (timeStop.active) {
        putTimeStopOnCooldown();
        playSFX(TIME_STOP_UP);
      } else {
        playSFX(SKILL_ON_COOLDOWN);
      }
    } else {
      playSFX(SKILL_ON_COOLDOWN);
    }
  };

  const putPerfectionismOnCooldown = () => {
    setPerfectionism((prev) => ({
      ...prev,
      onCooldown: true,
    }));
  };

  const removePerfectionismCooldown = () => {
    setPerfectionism((prev) => ({
      ...prev,
      onCooldown: false,
    }));
  };

  const activatePerfectionism = useCallback(() => {
    if (perfectionism.currentLevel && !perfectionism.onCooldown) {
      playSFX(PERFECTIONISM);
      putPerfectionismOnCooldown();
    }
    // It only plays SFX for now
  }, [perfectionism.currentLevel, perfectionism.onCooldown, playSFX]);

  const putMimicOnCooldown = () => {
    setMimic((prev) => ({
      ...prev,
      onCooldown: true,
    }));
  };

  const removeMimicCooldown = () => {
    setMimic((prev) => ({
      ...prev,
      onCooldown: false,
    }));
  };

  const activateMimic = useCallback((unshiftPlayerTetrominoCopy) => {
    if (mimic.currentLevel && !mimic.onCooldown) {
      playSFX(MIMIC);
      putMimicOnCooldown();
      unshiftPlayerTetrominoCopy();
    } else {
      playSFX(SKILL_ON_COOLDOWN);
    }
  }, [mimic.currentLevel, mimic.onCooldown, playSFX]);

  const putPixelPocketOnCooldown = () => {
    setPixelPocket((prev) => ({
      ...prev,
      onCooldown: true,
    }));
  };

  const removePixelPocketCooldown = () => {
    setPixelPocket((prev) => ({
      ...prev,
      onCooldown: false,
    }));
  };

  const activateBlink = useCallback((hardDrop) => {
    if (blink.currentLevel) {
      playSFX(TETROMINO_MERGE);
      hardDrop();
      removePixelPocketCooldown();
    }
  }, [blink.currentLevel, playSFX]);

  const activateHold = useCallback((holdPlayerTetromino) => {
    if (pixelPocket.currentLevel && !pixelPocket.onCooldown) {
      holdPlayerTetromino();
      playSFX(PIXEL_POCKET);
      putPixelPocketOnCooldown();
    } else {
      playSFX(SKILL_ON_COOLDOWN);
    }
  }, [pixelPocket.currentLevel, pixelPocket.onCooldown, playSFX]);

  return {
    state: {
      // Review these states, where they're being used
      exp,
      perfectionism,
      clairvoyance,
      blink,
      intuition,
      pixelPocket,
      mimic,
      timeStop,
    },
    actions: {
      calcExp,
      levelUpSkill,
      resetSkills,
      activateHold,
      activateMimic,
      activateBlink,
      activateTimeStop,
      activatePerfectionism,
      removePixelPocketCooldown,
      removeMimicCooldown,
      putTimeStopOnCooldown,
      removeTimeStopCooldown,
      removePerfectionismCooldown,
    },
    skills: [
      clairvoyance,
      pixelPocket,
      mimic,
      intuition,
      blink,
      timeStop,
      perfectionism,
    ],
  };
};
