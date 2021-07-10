import { useInterval } from './useInterval';

export const useTimers = ({ skillsAPI, gameStatusAPI }) => {
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
    },
  } = gameStatusAPI;

  // TIMERS
  // Using setInterval for now, even though it's not perfectly accurate
  useInterval(() => {
    // console.log('useInterval: timeStop cooldownTimer');
    if (!paused && timeStop.onCooldown > 0) {
      setTimeStop((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
    }
  }, timeStop.cooldownTimer);

  useInterval(() => {
    // console.log('useInterval: timeStop durationTimer');
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

  useInterval(() => {
    // console.log('useInterval: mimic cooldownTimer');
    if (!paused && mimic.onCooldown > 0) {
      setMimic((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
    }
  }, mimic.cooldownTimer);

  useInterval(() => {
    // console.log('useInterval: perfectionism cooldownTimer');
    if (!paused && perfectionism.onCooldown > 0) {
      setPerfectionism((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
    }
  }, perfectionism.cooldownTimer);
};
