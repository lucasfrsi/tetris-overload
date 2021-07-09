import { useState, useRef, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import BGMPaths from 'utils/BGMPaths';

export const useBGM = () => {
  const BGMPlayer = useRef({
    source: undefined,
    howl: undefined,
  });

  const [BGM, setBGM] = useState({
    mute: true,
  });

  const toggleMuteBGM = () => setBGM((prev) => ({
    ...prev,
    mute: !prev.mute,
  }));

  const playBGM = useCallback(() => {
    if (!BGM.mute && BGMPlayer.current.howl) {
      BGMPlayer.current.howl.play();
    }
  }, [BGM.mute]);

  const stopBGM = useCallback(() => {
    if (BGMPlayer.current.howl) {
      BGMPlayer.current.howl.stop();
    }
  }, []);

  const changeBGM = useCallback((type) => {
    if (BGMPlayer.current.source !== type) {
      BGMPlayer.current.source = type;
      BGMPlayer.current.howl = new Howl({ src: BGMPaths[type], volume: 1, loop: true });
    }
  }, []);

  useEffect(() => {
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
    },
  };
};

// Menu: play song
// Game: stop playing songs
// When game starts: play again
