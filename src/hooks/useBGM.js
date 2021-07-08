import { useState, useMemo, useEffect } from 'react';
import useSound from 'use-sound';

// BGM Imports
import menu from 'assets/bgm/BoxCat_Games_-_Mission.mp3';
import ingame from 'assets/bgm/BoxCat_Games_-_Against_the_Wall.mp3';

export const useBGM = () => {
  // useRef or useMemo ?? hmm
  const BGM_LIST = useMemo(() => ({
    menu,
    ingame,
  }), []);

  const [BGM, setBGM] = useState({
    current: BGM_LIST.menu,
    mute: true,
  });

  const toggleMuteBGM = () => setBGM((prev) => ({
    ...prev,
    mute: !prev.mute,
  }));

  const [play, { stop }] = useSound(BGM.current, { loop: true, volume: 1 });

  useEffect(() => {
    if (!BGM.mute) {
      play();
    }

    return () => stop();
  }, [BGM.mute, play, stop]);

  return {
    state: {
      BGM,
    },
    actions: {
      toggleMuteBGM,
    },
  };
};
