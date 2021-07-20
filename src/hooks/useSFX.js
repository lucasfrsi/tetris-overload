import { useState, useCallback } from 'react';
import { Howl } from 'howler';
import SFXSprite from 'assets/sfx/sfx_sprite.mp3';
import * as KEY from 'utils/SFXPaths';

const SFXHowl = new Howl({
  src: [SFXSprite],
  sprite: {
    [KEY.VO_1]: [
      0,
      490.9297052154195,
    ],
    [KEY.VO_2]: [
      2000,
      581.4058956916099,
    ],
    [KEY.VO_3]: [
      4000,
      576.5759637188213,
    ],
    [KEY.BUTTON_HOVER]: [
      6000,
      265.1927437641728,
    ],
    [KEY.BUTTON_SELECT]: [
      8000,
      925.895691609977,
    ],
    [KEY.BUTTON_START]: [
      10000,
      2830,
    ],
    [KEY.BUTTON_TOGGLE]: [
      14000,
      86.14512471655367,
    ],
    [KEY.CLEAR_DOUBLE]: [
      16000,
      1726.8253968253973,
    ],
    [KEY.CLEAR_SINGLE]: [
      19000,
      1606.5532879818604,
    ],
    [KEY.CLEAR_TETRIS]: [
      22000,
      2003.356009070295,
    ],
    [KEY.PERFECTIONISM]: [
      26000,
      1236.9841269841259,
    ],
    [KEY.CLEAR_TRIPLE]: [
      29000,
      1006.5079365079371,
    ],
    [KEY.VO_CONGRATULATIONS]: [
      32000,
      1296.4852607709786,
    ],
    [KEY.GAME_OVER]: [
      35000,
      1758.5941043083862,
    ],
    [KEY.VO_GAME_OVER]: [
      38000,
      1277.1428571428557,
    ],
    [KEY.VO_GO]: [
      41000,
      596.9160997732458,
    ],
    [KEY.LEVEL_UP]: [
      43000,
      1771.678004535147,
    ],
    [KEY.VO_LEVEL_UP]: [
      46000,
      783.9682539682542,
    ],
    [KEY.MIMIC]: [
      48000,
      2197.84580498866,
    ],
    [KEY.NEW_HIGHSCORE]: [
      52000,
      4575.3514739229,
    ],
    [KEY.VO_NEW_HIGHSCORE]: [
      58000,
      1135.623582766442,
    ],
    [KEY.PAUSE_IN]: [
      61000,
      259.7732426303878,
    ],
    [KEY.PAUSE_OUT]: [
      63000,
      260.13605442177123,
    ],
    [KEY.PIXEL_POCKET]: [
      65000,
      280.6349206349239,
    ],
    [KEY.SKILL_IS_UP]: [
      67000,
      468.5260770975077,
    ],
    [KEY.SKILL_LEARNED]: [
      69000,
      461.0884353741511,
    ],
    [KEY.SKILL_ON_COOLDOWN]: [
      71000,
      191.9954648526101,
    ],
    [KEY.TETROMINO_MERGE]: [
      73000,
      548.9795918367406,
    ],
    [KEY.TETROMINO_MOVE]: [
      75000,
      48.934240362811465,
    ],
    [KEY.TETROMINO_ROTATE]: [
      77000,
      139.2970521541912,
    ],
    [KEY.TIME_STOP_DOWN]: [
      79000,
      1858.5487528344656,
    ],
    [KEY.TIME_STOP_UP]: [
      82000,
      1858.5487528344656,
    ],
  },
  volume: 1,
  mute: true,
  preload: true,
});

export const useSFX = () => {
  const [SFX, setSFX] = useState({
    mute: true,
  });

  const toggleMuteSFX = () => {
    setSFX((prev) => ({
      ...prev,
      mute: !prev.mute,
    }));

    SFXHowl.mute(!SFXHowl.mute());
  };

  const getSFXHowlVolume = useCallback(() => SFXHowl.volume(), []);

  const changeSFXHowlVolume = useCallback((value) => {
    SFXHowl.volume(value);
  }, []);

  const playSFX = useCallback((spriteKey) => {
    if (!SFXHowl.mute()) SFXHowl.play(spriteKey);
  }, []);

  return {
    state: {
      SFX,
    },
    actions: {
      toggleMuteSFX,
      getSFXHowlVolume,
      changeSFXHowlVolume,
      playSFX,
    },
  };
};
