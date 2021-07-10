import { useState, useRef, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import BGMPaths, { MENU } from 'utils/BGMPaths';

export const useBGM = () => {
  const BGMPlayer = useRef({
    howl: new Howl({ src: BGMPaths[MENU], volume: 1, loop: true }),
    mute: true,
  });

  const [BGM, setBGM] = useState({
    mute: true,
  });

  const toggleMuteBGM = () => setBGM((prev) => ({
    ...prev,
    mute: !prev.mute,
  }));

  const playBGM = useCallback(() => {
    if (!BGMPlayer.current.mute) {
      console.log('playBGM');
      BGMPlayer.current.howl.play();
      BGMPlayer.current.howl.fade(0, 1, 500);
    }
  }, []);

  const stopBGM = useCallback(() => {
    BGMPlayer.current.howl.stop();
  }, []);

  const pauseBGM = useCallback(() => {
    BGMPlayer.current.howl.pause();
  }, []);

  const changeBGM = useCallback((type) => {
    BGMPlayer.current.howl = new Howl({ src: BGMPaths[type], volume: 1, loop: true });
  }, []);

  useEffect(() => {
    BGMPlayer.current.mute = BGM.mute;
    if (BGM.mute) {
      stopBGM();
    } else {
      playBGM();
    }
  }, [BGM.mute, playBGM, stopBGM]);

  return {
    state: {
      BGM,
    },
    actions: {
      toggleMuteBGM,
      playBGM,
      stopBGM,
      changeBGM,
      pauseBGM,
    },
  };
};
