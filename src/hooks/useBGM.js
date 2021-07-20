import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import BGMSprite from 'assets/bgm/bgm_sprite.mp3';
import { MENU, INGAME } from 'utils/BGMPaths';

const BGMHowl = new Howl({
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
  mute: true,
  preload: true,
  currentID: undefined,
});

export const useBGM = () => {
  const [BGM, setBGM] = useState({
    mute: true,
  });

  const toggleMuteBGM = () => {
    setBGM((prev) => ({
      ...prev,
      mute: !prev.mute,
    }));

    BGMHowl.mute(!BGMHowl.mute());
  };

  const getBGMHowlVolume = useCallback(() => BGMHowl.volume(), []);

  const changeBGMHowlVolume = useCallback((value) => {
    BGMHowl.volume(value);
  }, []);

  const playBGM = useCallback((spriteKey) => {
    if (!BGMHowl.mute()) {
      let id = BGMHowl.currentID;

      if (id) {
        BGMHowl.play(id);
      } else {
        id = BGMHowl.play(spriteKey);
        BGMHowl.currentID = id;
      }

      BGMHowl.fade(0, BGMHowl.volume(), 500, id);
    }
  }, []);

  const stopBGM = useCallback(() => {
    BGMHowl.stop();
    BGMHowl.currentID = undefined;
  }, []);

  const pauseBGM = useCallback(() => {
    const id = BGMHowl.currentID;
    if (id) BGMHowl.pause(id);
  }, []);

  useEffect(() => {
    BGMHowl.mute(BGM.mute);

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
      getBGMHowlVolume,
      changeBGMHowlVolume,
    },
  };
};
