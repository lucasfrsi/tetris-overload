import { useState, useCallback, useMemo } from 'react';
import { useInterval } from 'hooks/useInterval';

export const useSkills = () => {
  const INTERVAL_DELAY = 1000;
  const EXP_POINTS = useMemo(() => [5, 15, 25, 35], []);

  const [exp, setExp] = useState(0);

  const [clairvoyance, setClairvoyance] = useState({
    expCost: [0, 50, 75, 100],
    currentLevel: 3,
  });

  const [pixelPocket, setPixelPocket] = useState({
    expCost: [0, 50],
    currentLevel: 0,
  });

  const [intuition, setIntuition] = useState({
    expCost: [0, 100],
    currentLevel: 0,
  });

  const [blink, setBlink] = useState({
    expCost: [0, 100],
    currentLevel: 0,
  });

  const [greedy, setGreedy] = useState({
    expCost: [0, 50, 75, 100],
    multiplier: [1, 1.25, 1.5, 1.75],
    currentLevel: 0,
  });

  const [timeStop, setTimeStop] = useState({
    expCost: [0, 100, 150, 200],
    duration: [0, 4, 6, 8],
    durationTimer: null,
    active: 0,
    cooldown: [0, 90, 75, 60],
    cooldownTimer: null,
    onCooldown: 0,
    currentLevel: 0,
  });

  const [mimic, setMimic] = useState({
    expCost: [0, 100, 150, 200],
    cooldown: [0, 60, 45, 30],
    onCooldown: 0,
    cooldownTimer: null,
    currentLevel: 0,
  });

  const [perfectionism, setPerfectionism] = useState({
    expCost: [0, 150, 200, 250],
    cooldown: [0, 120, 90, 60],
    onCooldown: 0,
    cooldownTimer: null,
    currentLevel: 0,
  });

  const calcExp = useCallback((rowsCleared) => {
    const expFormula = EXP_POINTS[rowsCleared - 1] * greedy.multiplier[greedy.currentLevel];
    setExp((prev) => prev + expFormula);
  }, [EXP_POINTS, greedy.currentLevel, greedy.multiplier]);

  const activateTimeStop = () => {
    if (timeStop.currentLevel) {
      if (!timeStop.active && !timeStop.onCooldown) {
        setTimeStop((prev) => ({
          ...prev,
          active: prev.duration[prev.currentLevel],
          durationTimer: INTERVAL_DELAY,
        }));
      } else if (timeStop.active) {
        setTimeStop((prev) => ({
          ...prev,
          active: 0,
          onCooldown: prev.cooldown[prev.currentLevel],
          durationTimer: null,
          cooldownTimer: INTERVAL_DELAY,
        }));
      }
    }
  };

  // TIMERS
  // Using setInterval for now, even though it's not perfectly accurate
  useInterval(() => {
    // console.log('useInterval: timeStop cooldownTimer');
    if (timeStop.onCooldown > 0) {
      setTimeStop((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
    }
  }, timeStop.cooldownTimer);

  useInterval(() => {
    // console.log('useInterval: timeStop durationTimer');
    if (timeStop.active > 0) {
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
    if (mimic.onCooldown > 0) {
      setMimic((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
    }
  }, mimic.cooldownTimer);

  useInterval(() => {
    // console.log('useInterval: perfectionism cooldownTimer');
    if (perfectionism.onCooldown > 0) {
      setPerfectionism((prev) => ({
        ...prev,
        onCooldown: prev.onCooldown - 1,
        cooldownTimer: prev.onCooldown === 1 ? null : INTERVAL_DELAY,
      }));
    }
  }, perfectionism.cooldownTimer);

  return {
    constants: {
      INTERVAL_DELAY,
    },
    state: {
      exp,
      perfectionism,
      clairvoyance,
      blink,
      intuition,
      greedy,
      pixelPocket,
      mimic,
      timeStop,
    },
    actions: {
      setExp,
      calcExp,
      setPerfectionism,
      setClairvoyance,
      setBlink,
      setIntuition,
      setGreedy,
      setPixelPocket,
      setMimic,
      setTimeStop,
      activateTimeStop,
    },
  };
};

// - Clairvoyance [OK]
// =PASSIVE=
// = Allow the player to see the next piece(s)

// - Time Stop [OK]
// =ACTIVE=
// = Allow the player to freely move the piece for a certain period of time

// - Mimic [OK]
// =ACTIVE=
// = Set the next piece to be equal to the current one

// - Pixel Pocket [OK]
// =ACTIVE=
// = Stores a piece to be used later on

// - Perfectionist
// =PASSIVE=
// = Clearing 4 rows at once resets all abilities cooldown

// - Intuition [OK]
// =PASSIVE=
// = Shows a mark of where the piece will fall at

// - Greedy
// =PASSIVE=
// = Earns more exp/money per coin and rows cleared

// - Blink [OK]
// =ACTIVE=
// = Immediately set the piece to the intuition location mark
