import { useState, useRef } from 'react';
import { Howl } from 'howler';
import SFXPaths from 'utils/SFXPaths';

export const useSFX = () => {
  const SFXPlayer = useRef({
    source: undefined,
    howl: undefined,
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
      if (SFXPlayer.current.source !== type) {
        SFXPlayer.current.source = type;
        SFXPlayer.current.howl = new Howl({ src: SFXPaths[type], volume: 0.5 });
        SFXPlayer.current.howl.play();
      } else {
        SFXPlayer.current.howl.play();
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
