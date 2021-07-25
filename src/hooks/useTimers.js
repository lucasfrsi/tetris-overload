import { useState, useEffect, useMemo, useRef } from 'react';
import { SKILL_IS_UP } from 'utils/SFXPaths';
import { useInterval } from './useInterval';

export const useTimers = ({ skillsAPI, gameStatusAPI, tetrisAPI, SFX_API }) => {
  const {
    state: {
      mimic,
      perfectionism,
    },
    actions: {
      removeMimicCooldown,
      removePerfectionismCooldown,
    },
  } = skillsAPI;

  const {
    state: {
      ticking,
      dropTime,
      onCountdown,
      gameStarted,
    },
    actions: {
      setOnCountdown,
    },
  } = gameStatusAPI;

  const {
    actions: {
      startGame,
      resumeGame,
      drop,
    },
  } = tetrisAPI;

  const {
    actions: {
      playSFX,
    },
  } = SFX_API;

  // TIMERS
  const mimicCounter = useRef({
    cooldown: 0,
  });

  const perfectionismCounter = useRef({
    cooldown: 0,
  });

  const INTERVAL_DELAY = useMemo(() => {
    if (ticking) {
      if (mimic.onCooldown || perfectionism.onCooldown) return 1000;
    }
    return null;
  }, [mimic.onCooldown, perfectionism.onCooldown, ticking]);

  useEffect(() => {
    if (mimic.onCooldown && mimicCounter.current.cooldown === 0) {
      mimicCounter.current.cooldown = mimic.cooldown[mimic.currentLevel];
    }
  }, [mimic.cooldown, mimic.currentLevel, mimic.onCooldown]);

  useEffect(() => {
    if (perfectionism.onCooldown && perfectionismCounter.current.cooldown === 0) {
      perfectionismCounter.current.cooldown = perfectionism.cooldown[perfectionism.currentLevel];
      // Set mimic counter to 1
      if (mimicCounter.current.cooldown > 1) mimicCounter.current.cooldown = 1;
    }
  }, [perfectionism.cooldown, perfectionism.currentLevel, perfectionism.onCooldown]);

  // Skills Timer
  useInterval(() => {
    if (mimicCounter.current.cooldown > 0) {
      mimicCounter.current.cooldown--;
      if (mimicCounter.current.cooldown === 0) {
        removeMimicCooldown();
        playSFX(SKILL_IS_UP);
      }
    }

    if (perfectionismCounter.current.cooldown > 0) {
      perfectionismCounter.current.cooldown--;
      if (perfectionismCounter.current.cooldown === 0) {
        removePerfectionismCooldown();
        playSFX(SKILL_IS_UP);
      }
    }
  }, INTERVAL_DELAY);

  // Countdown Timer
  const [onCountdownTimer, setOnCountdownTimer] = useState(null);
  const [countdown, setCountdown] = useState(null);
  useInterval(() => {
    if (countdown > 0) {
      setCountdown((prev) => prev - 1);
    } else if (countdown === 0) {
      if (gameStarted) {
        resumeGame();
      } else {
        startGame();
      }
      setOnCountdown(false);
    }
  }, onCountdownTimer);

  useEffect(() => {
    if (onCountdown === true) {
      setCountdown(3);
      setOnCountdownTimer(1000);
    } else {
      setCountdown(null);
      setOnCountdownTimer(null);
    }
  }, [onCountdown]);

  // Core Timer
  useInterval(() => {
    drop();
  }, dropTime);

  return {
    state: {
      countdown,
    },
  };
};
