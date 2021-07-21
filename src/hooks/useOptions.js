import { useState, useEffect } from 'react';
import gameModes from 'utils/gameModes';
import {
  keyBindingsModes,
  NUMPAD_MODE,
  QWER_MODE,
  getNUMPADKeyBindings,
  getQWERKeyBindings,
} from 'utils/keyBindings';

export const useOptions = ({ BGM_API, SFX_API }) => {
  const {
    actions: {
      getBGMHowlVolume,
      changeBGMHowlVolume,
    },
  } = BGM_API;

  const {
    actions: {
      getSFXHowlVolume,
      changeSFXHowlVolume,
    },
  } = SFX_API;

  // GAME MODE
  const [gameMode, setGameMode] = useState(gameModes[0]);

  const changeGameMode = (mode) => setGameMode(mode);

  // BGM SLIDER
  const [BGMSlider, setBGMSlider] = useState({
    min: 0.0,
    max: 1.0,
    step: 0.01,
    value: getBGMHowlVolume(),
  });

  const changeBGMSliderValue = (value) => {
    setBGMSlider((prev) => ({
      ...prev,
      value,
    }));
  };

  // SFX SLIDER
  const [SFXSlider, setSFXSlider] = useState({
    min: 0.0,
    max: 1.0,
    step: 0.01,
    value: getSFXHowlVolume(),
  });

  const changeSFXSliderValue = (value) => {
    setSFXSlider((prev) => ({
      ...prev,
      value,
    }));
  };

  // KEY BINDINGS
  // Modes
  const [keyBindingsMode, setKeyBindingsMode] = useState(keyBindingsModes[0]);
  const changeKeyBindingsMode = (mode) => setKeyBindingsMode(mode);

  // Bindings
  const [keyBindings, setKeyBindings] = useState();
  const changeKeyBinding = (identifier, eventKey, eventCode) => {
    const newKeyBindings = JSON.parse(JSON.stringify(keyBindings));
    newKeyBindings[identifier].key = eventKey;
    newKeyBindings[identifier].code = eventCode;
    setKeyBindings(newKeyBindings);
  };

  // RESET TO DEFAULT
  const resetToDefault = () => {
    changeGameMode(gameModes[0]);
    changeSFXSliderValue(1.0);
    changeBGMSliderValue(1.0);
    changeKeyBindingsMode(keyBindingsModes[0]);
  };

  // Automatically update the key bindings according to the mode that is set
  useEffect(() => {
    if (keyBindingsMode === NUMPAD_MODE) {
      setKeyBindings(getNUMPADKeyBindings());
    } else if (keyBindingsMode === QWER_MODE) {
      setKeyBindings(getQWERKeyBindings());
    }
  }, [keyBindingsMode]);

  // Automatically update the SFX and BGM Howl instances as slider value changes
  useEffect(() => {
    changeBGMHowlVolume(BGMSlider.value);
  }, [BGMSlider.value, changeBGMHowlVolume]);

  useEffect(() => {
    changeSFXHowlVolume(SFXSlider.value);
  }, [SFXSlider.value, changeSFXHowlVolume]);

  return {
    state: {
      BGMSlider,
      SFXSlider,
      gameModes,
      gameMode,
      keyBindingsModes,
      keyBindingsMode,
      keyBindings,
    },
    actions: {
      changeBGMSliderValue,
      changeSFXSliderValue,
      changeGameMode,
      changeKeyBindingsMode,
      changeKeyBinding,
      resetToDefault,
    },
  };
};
