import { useState, useRef } from 'react';
import sfxPaths from 'utils/sfxPaths';
import { Howl } from 'howler';

export const useSFX = () => {
  const SFXPlayer = useRef({
    source: undefined,
    howlInstance: undefined,
  });

  const [SFX, setSFX] = useState({
    mute: true,
  });

  const toggleMuteSFX = () => setSFX((prev) => ({
    ...prev,
    mute: !prev.mute,
  }));

  const playSFX = (type) => {
    if (!SFX.mute) {
      let { source, howl } = SFXPlayer.current;

      if (source !== type) {
        source = type;
        howl = new Howl({ src: sfxPaths[type] });
        howl.play();
      } else {
        howl.play();
      }
    }
  };

  return {
    state: {
      SFX,
    },
    actions: {
      toggleMuteSFX,
      playSFX,
    },
  };
};

/*
  SFX List

  == MENU ==
  - Button hover (OK)
  - Button select (OK)

  == TETRIS ==
  - Tetrominoes
    - fix position (when merged / more than 1 sound)
    - rotate (?)
    - move any directions

  - Skills
    - Pixel Pocket
    - Mimic
    - Blink
    - Time Stop
    - Perfectionism

    - Try to activate while on cooldown
    - CoolDown is over
    - Ability learned
    - Enough EXP to spend (?)

  - Game
    - Initial countdown and start
    - Pause
    - Game Over
    - Rows cleared (separate sounds for: 1, 2, 3 or 4 rows cleared)
*/
