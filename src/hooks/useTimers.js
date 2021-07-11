import { useState, useEffect } from 'react';
import { useInterval } from './useInterval';

export const useTimers = ({ skillsAPI, gameStatusAPI, tetrisAPI }) => {
  const INTERVAL_DELAY = 1000;

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
      paused,
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

  // TIMERS
  // Using setInterval for now, even though it's not perfectly accurate

  // Time Stop - Cooldown
  useInterval(() => {
    if (!paused && timeStop.onCooldown > 0) {
      setTimeStop((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
    }
  }, timeStop.cooldownTimer);

  // Time Stop - Duration
  useInterval(() => {
    if (!paused && timeStop.active > 0) {
      setTimeStop((prev) => ({
        ...prev,
        active: prev.active - 1,
        onCooldown: prev.active === 1 ? prev.cooldown[prev.currentLevel] : prev.onCooldown,
        durationTimer: prev.active === 1 ? null : INTERVAL_DELAY,
        cooldownTimer: prev.active === 1 ? INTERVAL_DELAY : null,
      }));
    }
  }, timeStop.durationTimer);

  // Mimic - Cooldown
  useInterval(() => {
    if (!paused && mimic.onCooldown > 0) {
      setMimic((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
    }
  }, mimic.cooldownTimer);

  // Perfectionism - Cooldown
  useInterval(() => {
    if (!paused && perfectionism.onCooldown > 0) {
      setPerfectionism((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
    }
  }, perfectionism.cooldownTimer);

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
    } else if (onCountdown === false) {
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
