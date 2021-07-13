import { useState, useRef, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import BGMSprite from 'assets/bgm/bgm_sprite.mp3';
import { MENU, INGAME } from 'utils/BGMPaths';

export const useBGM = () => {
  const BGMPlayer = useRef({
    howl: new Howl({
      src: [BGMSprite],
      sprite: {
        [INGAME]: [
          0,
          204930.61224489796,
          true,
        ],
        [MENU]: [
          206000,
          81397.55102040817,
          true,
        ],
      },
      volume: 1,
      preload: true,
    }),
    mute: true,
  });

  const [BGM, setBGM] = useState({
    mute: true,
  });

  const toggleMuteBGM = () => setBGM((prev) => ({
    ...prev,
    mute: !prev.mute,
  }));

  const playBGM = useCallback((spriteKey) => {
    if (!BGMPlayer.current.mute) {
      BGMPlayer.current.howl.play(spriteKey);
      BGMPlayer.current.howl.fade(0, 1, 500);
    }
  }, []);

  const stopBGM = useCallback(() => {
    BGMPlayer.current.howl.stop();
  }, []);

  const pauseBGM = useCallback(() => {
    BGMPlayer.current.howl.pause(); // not resuming from where it stoped
  }, []);

  useEffect(() => {
    BGMPlayer.current.mute = BGM.mute;
    if (BGM.mute) {
      stopBGM();
    } else {
      playBGM(MENU);
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
      pauseBGM,
    },
  };
};
