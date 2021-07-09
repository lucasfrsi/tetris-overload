import { useState, useRef, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import BGMPaths from 'utils/BGMPaths';

export const useBGM = () => {
  const BGMPlayer = useRef({
    source: undefined,
    howl: undefined,
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
    console.log('playBGM');
    if (!BGMPlayer.current.mute && BGMPlayer.current.howl) {
      BGMPlayer.current.howl.play();
      BGMPlayer.current.howl.fade(0, 1, 500);
    }
  }, []);

  const stopBGM = useCallback(() => {
    if (BGMPlayer.current.howl) {
      BGMPlayer.current.howl.stop();
    }
  }, []);

  const pauseBGM = useCallback(() => {
    if (BGMPlayer.current.howl) {
      BGMPlayer.current.howl.pause();
    }
  }, []);

  const changeBGM = useCallback((type) => {
    if (BGMPlayer.current.source !== type) {
      BGMPlayer.current.source = type;
      BGMPlayer.current.howl = new Howl({ src: BGMPaths[type], volume: 1, loop: true });
    }
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

// Menu: play song
// Game: stop playing songs
// When game starts: play again
