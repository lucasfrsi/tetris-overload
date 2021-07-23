import { useState, useEffect, useCallback } from 'react';
import gameModes, { PROGRESSIVE_OVERLOAD_MODE } from 'utils/gameModes';
import {
  keyBindingsModes,
  NUMPAD_MODE,
  QWER_MODE,
  CUSTOM_MODE,
  getNUMPADKeyBindings,
  getQWERKeyBindings,
  getEmptyKeyBindings,
} from 'utils/keyBindings';
import { initializeKey, setKeyValue, OPTIONS_KEY } from 'utils/localStorage';

export const useOptions = ({ BGM_API, SFX_API, isLocalStorageAvailable }) => {
  const {
    state: {
      BGM,
    },
    actions: {
      getBGMHowlVolume,
      changeBGMHowlVolume,
      toggleMuteBGM,
    },
  } = BGM_API;

  const {
    state: {
      SFX,
    },
    actions: {
      getSFXHowlVolume,
      changeSFXHowlVolume,
      toggleMuteSFX,
      playSFX,
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
      value: parseFloat(value),
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
      value: parseFloat(value),
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

  const clearKeyBindings = () => {
    setKeyBindings(getEmptyKeyBindings());
    changeKeyBindingsMode(CUSTOM_MODE);
  };

  // Identifiers Trackers
  const [usedKeys, setUsedKeys] = useState();
  const [usedCodes, setUsedCodes] = useState();

  const fillTrackers = useCallback(() => {
    if (keyBindings) {
      const keysSet = new Set();
      const codesSet = new Set();

      Object.values(keyBindings).forEach((action) => {
        if (action.key !== '' && action.code !== '') {
          keysSet.add(action.key);
          codesSet.add(action.code);
        }
      });

      setUsedKeys(keysSet);
      setUsedCodes(codesSet);
    }
  }, [keyBindings]);
  useEffect(() => fillTrackers(), [fillTrackers]);

  // Check if all key bindings are uniquely filled
  const trackersAreFilled = () => {
    const keyBindingsLength = Object.keys(keyBindings).length;
    const usedKeysLength = usedKeys.size;
    const usedCodesLength = usedKeys.size;

    return usedKeysLength === keyBindingsLength && usedCodesLength === keyBindingsLength;
  };

  // RESET TO DEFAULT
  const resetToDefault = () => {
    changeGameMode(gameModes[0]);
    changeSFXSliderValue(1.0);
    changeBGMSliderValue(1.0);
    changeKeyBindingsMode(keyBindingsModes[0]);
  };

  // SAVE TO LOCAL STORAGE
  const saveOptionsToLocalStorage = () => {
    const optionsToSave = {
      gameMode,
      sfxVolume: SFXSlider.value,
      bgmVolume: BGMSlider.value,
      keyBindingsMode,
      keyBindings: keyBindingsMode === CUSTOM_MODE ? keyBindings : {},
    };

    setKeyValue(OPTIONS_KEY, optionsToSave);
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

  // If local storage is available, initialize all states according to it
  // Otherwise just use the default options
  useEffect(() => {
    if (isLocalStorageAvailable) {
      const defaultOptions = {
        gameMode: PROGRESSIVE_OVERLOAD_MODE,
        sfxVolume: 1.0,
        bgmVolume: 1.0,
        keyBindingsMode: NUMPAD_MODE,
        keyBindings: {},
      };

      const storedOptions = initializeKey(isLocalStorageAvailable, OPTIONS_KEY, defaultOptions);

      changeGameMode(storedOptions.gameMode);
      changeSFXSliderValue(storedOptions.sfxVolume);
      changeBGMSliderValue(storedOptions.bgmVolume);
      changeKeyBindingsMode(storedOptions.keyBindingsMode);

      if (storedOptions.keyBindingsMode === CUSTOM_MODE) {
        setKeyBindings(storedOptions.keyBindings);
      }
    }
  }, [isLocalStorageAvailable]);

  return {
    state: {
      BGMSlider,
      SFXSlider,
      gameModes,
      gameMode,
      keyBindingsModes,
      keyBindingsMode,
      keyBindings,
      usedKeys,
      usedCodes,
      BGM: BGM.mute,
      SFX: SFX.mute,

    },
    actions: {
      changeBGMSliderValue,
      changeSFXSliderValue,
      changeGameMode,
      changeKeyBindingsMode,
      changeKeyBinding,
      resetToDefault,
      saveOptionsToLocalStorage,
      clearKeyBindings,
      trackersAreFilled,
      toggleMuteBGM,
      toggleMuteSFX,
      playSFX,
    },
  };
};
