import { useState } from 'react';

export const useSkills = () => {
  const [exp, setExp] = useState(0);

  const [clairvoyance, setClairvoyance] = useState({
    expCost: [0, 50, 75, 100],
    cooldown: 0,
    duration: 0,
    currentLevel: 0,
  });

  const [pixelPocket, setPixelPocket] = useState({
    expCost: [0, 50],
    cooldown: 0,
    duration: 0,
    currentLevel: 0,
  });

  const [intuition, setIntuition] = useState({
    expCost: [0, 100],
    cooldown: 0,
    duration: 0,
    currentLevel: 0,
  });

  const [blink, setBlink] = useState({
    expCost: [0, 100],
    cooldown: 0,
    duration: 0,
    currentLevel: 0,
  });

  const [greedy, setGreedy] = useState({
    expCost: [0, 50, 75, 100],
    multiplier: [0, 1.25, 1.5, 2],
    cooldown: 0,
    duration: 0,
    currentLevel: 0,
  });

  const [timeStop, setTimeStop] = useState({
    expCost: [0, 100, 150, 200],
    cooldown: [0, 90, 75, 60],
    duration: [0, 4, 6, 8],
    currentLevel: 0,
  });

  const [mimic, setMimic] = useState({
    expCost: [0, 100, 150, 200],
    cooldown: [0, 60, 45, 30],
    duration: 0,
    currentLevel: 0,
  });

  const [perfectionism, setPerfectionism] = useState({
    expCost: [0, 150, 200, 250],
    cooldown: [0, 120, 90, 60],
    duration: 0,
    currentLevel: 0,
  });

  return {
    exp,
    setExp,
    perfectionism,
    setPerfectionism,
    clairvoyance,
    setClairvoyance,
    blink,
    setBlink,
    intuition,
    setIntuition,
    greedy,
    setGreedy,
    pixelPocket,
    setPixelPocket,
    mimic,
    setMimic,
    timeStop,
    setTimeStop,
  };
};

// - Clairvoyance [OK]
// =PASSIVE=
// = Allow the player to see the next piece(s)

// - Time Stop
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

// - Blink
// =ACTIVE=
// = Immediately set the piece to the intuition location mark
