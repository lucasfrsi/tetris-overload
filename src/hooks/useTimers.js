import { useState, useEffect, useMemo } from 'react';
import { TIME_STOP_UP, SKILL_IS_UP } from 'utils/SFXPaths';
import { useInterval } from './useInterval';

export const useTimers = ({ skillsAPI, gameStatusAPI, tetrisAPI, SFX_API }) => {
  const INTERVAL_DELAY = useMemo(() => 1000, []);

  const {
    state: {
      timeStop,
      mimic,
      perfectionism,
    },
    actions: {
      setTimeStop,
      setMimic,
      setPerfectionism,
    },
  } = skillsAPI;

  const {
    state: {
      ticking,
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
    },
  } = tetrisAPI;

  const {
    actions: {
      playSFX,
    },
  } = SFX_API;

  // TIMERS
  // Using setInterval for now, even though it's not perfectly accurate

  // Time Stop - Cooldown
  useInterval(() => {
    if (timeStop.onCooldown > 0) {
      setTimeStop((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
      if (timeStop.onCooldown === 1) playSFX(SKILL_IS_UP);
    }
  }, ticking ? timeStop.cooldownTimer : null);

  // Time Stop - Duration
  useInterval(() => {
    if (timeStop.active > 0) {
      setTimeStop((prev) => ({
        ...prev,
        active: prev.active - 1,
        onCooldown: prev.active === 1 ? prev.cooldown[prev.currentLevel] : prev.onCooldown,
        durationTimer: prev.active === 1 ? null : INTERVAL_DELAY,
        cooldownTimer: prev.active === 1 ? INTERVAL_DELAY : null,
      }));
      if (timeStop.active === 2) playSFX(TIME_STOP_UP);
    }
  }, ticking ? timeStop.durationTimer : null);

  // Mimic - Cooldown
  useInterval(() => {
    if (mimic.onCooldown > 0) {
      setMimic((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
      if (mimic.onCooldown === 1) playSFX(SKILL_IS_UP);
    }
  }, ticking ? mimic.cooldownTimer : null);

  // Perfectionism - Cooldown
  useInterval(() => {
    if (perfectionism.onCooldown > 0) {
      setPerfectionism((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
      if (perfectionism.onCooldown === 1) playSFX(SKILL_IS_UP);
    }
  }, ticking ? perfectionism.cooldownTimer : null);

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

  return {
    state: {
      countdown,
    },
  };
};
