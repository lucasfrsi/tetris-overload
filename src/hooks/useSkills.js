import { useState, useCallback, useMemo } from 'react';
import { PIXEL_POCKET, TETROMINO_MERGE, MIMIC, SKILL_ON_COOLDOWN, SKILL_LEARNED, PERFECTIONISM } from 'utils/SFXPaths';
import * as S from 'utils/skillsMap';
import { CLASSIC_MODE, CLASSIC_OVERLOAD_MODE } from 'utils/gameModes';

const EXP_POINTS = [10, 30, 50, 70];

export const useSkills = ({ SFX_API, optionsAPI }) => {
  const {
    actions: { playSFX },
  } = SFX_API;

  const {
    state: {
      gameMode,
    },
  } = optionsAPI;

  const [exp, setExp] = useState(0);

  const [clairvoyance, setClairvoyance] = useState({
    name: S.CLAIRVOYANCE,
    expCost: [0, 50, 75, 100],
    currentLevel: 0,
    passive: true,
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
    passive: true,
  });

  const [blink, setBlink] = useState({
    name: S.BLINK,
    expCost: [0, 100],
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
    modifier: [0, 1.3, 1.6, 2],
    cooldown: [0, 120, 90, 60],
    onCooldown: false,
    currentLevel: 0,
  });

  const calcExp = useCallback((rowsCleared) => {
    const expFormula = EXP_POINTS[rowsCleared - 1];
    setExp((prev) => prev + expFormula);
  }, []);

  const skillsMap = useMemo(() => ({
    [S.CLAIRVOYANCE]: [clairvoyance, setClairvoyance],
    [S.PIXELPOCKET]: [pixelPocket, setPixelPocket],
    [S.MIMIC]: [mimic, setMimic],
    [S.INTUITION]: [intuition, setIntuition],
    [S.BLINK]: [blink, setBlink],
    [S.PERFECTIONISM]: [perfectionism, setPerfectionism],
  }), [blink, clairvoyance, intuition, mimic, perfectionism, pixelPocket]);

  const canSkillBeLeveled = useCallback((skillKey) => {
    const [skill] = skillsMap[skillKey];

    const currentSkillLevel = skill.currentLevel;
    const skillMaxLevel = skill.expCost.length - 1;

    if (currentSkillLevel < skillMaxLevel) {
      const costToLevel = skill.expCost[currentSkillLevel + 1];
      if (exp >= costToLevel) {
        return true;
      }
    }

    return false;
  }, [exp, skillsMap]);

  const levelUpSkill = useCallback((skillKey) => {
    if (canSkillBeLeveled(skillKey)) {
      const [skill, setSkill] = skillsMap[skillKey];
      const currentSkillLevel = skill.currentLevel;
      const costToLevel = skill.expCost[currentSkillLevel + 1];

      setSkill((prev) => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
      }));

      setExp((prev) => prev - costToLevel);

      playSFX(SKILL_LEARNED);
      return;
    }

    playSFX(SKILL_ON_COOLDOWN);
  }, [canSkillBeLeveled, playSFX, skillsMap]);

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

  const setSkillsToClassicMode = () => {
    setExp(0);
    setClairvoyance((prev) => ({
      ...prev,
      currentLevel: 3,
    }));

    setPixelPocket((prev) => ({
      ...prev,
      currentLevel: 1,
      onCooldown: false,
    }));

    setIntuition((prev) => ({
      ...prev,
      currentLevel: 1,
    }));

    setBlink((prev) => ({
      ...prev,
      currentLevel: 1,
    }));

    setMimic((prev) => ({
      ...prev,
      currentLevel: 0,
      onCooldown: false,
    }));

    setPerfectionism((prev) => ({
      ...prev,
      currentLevel: 0,
      onCooldown: false,
    }));
  };

  const setAllSkillsToMaxLvl = () => {
    setExp(0);
    setClairvoyance((prev) => ({
      ...prev,
      currentLevel: 3,
    }));

    setPixelPocket((prev) => ({
      ...prev,
      currentLevel: 1,
      onCooldown: false,
    }));

    setIntuition((prev) => ({
      ...prev,
      currentLevel: 1,
    }));

    setBlink((prev) => ({
      ...prev,
      currentLevel: 1,
    }));

    setMimic((prev) => ({
      ...prev,
      currentLevel: 3,
      onCooldown: false,
    }));

    setPerfectionism((prev) => ({
      ...prev,
      currentLevel: 3,
      onCooldown: false,
    }));
  };

  const resetSkills = useCallback(() => {
    if (gameMode === CLASSIC_MODE) {
      setSkillsToClassicMode();
    } else if (gameMode === CLASSIC_OVERLOAD_MODE) {
      setAllSkillsToMaxLvl();
    } else {
      setExp(0);

      setClairvoyance((prev) => ({
        ...prev,
        currentLevel: 0,
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

      setMimic((prev) => ({
        ...prev,
        currentLevel: 0,
        onCooldown: false,
      }));

      setPerfectionism((prev) => ({
        ...prev,
        currentLevel: 0,
        onCooldown: false,
      }));
    }
  }, [gameMode]);

  return {
    state: {
      exp,
      perfectionism,
      clairvoyance,
      intuition,
      pixelPocket,
      mimic,
    },
    actions: {
      calcExp,
      canSkillBeLeveled,
      levelUpSkill,
      resetSkills,
      activateHold,
      activateMimic,
      activateBlink,
      activatePerfectionism,
      removePixelPocketCooldown,
      removeMimicCooldown,
      removePerfectionismCooldown,
    },
    skills: [
      clairvoyance,
      pixelPocket,
      mimic,
      intuition,
      blink,
      perfectionism,
    ],
  };
};
