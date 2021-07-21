/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import * as styles from './style';
import Picker from '../Picker';
import KeyBindingGetter from '../KeyBindingGetter';

const Options = ({ optionsAPI, goToMenu }) => {
  const {
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
  } = optionsAPI;

  // Key Binding Getter State
  const [getterState, setGetterState] = useState({
    open: false,
    action: '',
    initialKey: '',
    initialCode: '',
  });

  const openGetter = (action, key, code) => {
    setGetterState({
      open: true,
      action,
      initialKey: key,
      initialCode: code,
    });
  };

  const closeGetter = () => {
    setGetterState({
      open: false,
      action: '',
      initialKey: '',
      initialCode: '',
    });
  };

  return (
    <div css={styles.options}>
      {getterState.open ? (
        <KeyBindingGetter
          action={getterState.action}
          initialKey={getterState.initialKey}
          initialCode={getterState.initialCode}
          changeKeyBinding={changeKeyBinding}
          closeGetter={closeGetter}
          changeKeyBindingsMode={changeKeyBindingsMode}
        />
      ) : null}
      <h1>Options</h1>

      <div>
        <span>Game Mode</span>
        <Picker
          state={gameMode}
          changeState={changeGameMode}
          possibleStates={gameModes}
        />
      </div>

      <br />
      <span>SFX Volume</span>
      <input
        type="range"
        min={SFXSlider.min}
        max={SFXSlider.max}
        step={SFXSlider.step}
        value={SFXSlider.value}
        onChange={(e) => changeSFXSliderValue(e.target.value)}
      />
      <span>{parseInt(SFXSlider.value * 100, 10)}%</span>
      <br />
      <span>BGM Volume</span>
      <input
        type="range"
        min={BGMSlider.min}
        max={BGMSlider.max}
        step={BGMSlider.step}
        value={BGMSlider.value}
        onChange={(e) => changeBGMSliderValue(e.target.value)}
      />
      <span>{parseInt(BGMSlider.value * 100, 10)}%</span>
      <br />
      <span>Key Bindings</span>
      <Picker
        state={keyBindingsMode}
        changeState={changeKeyBindingsMode}
        possibleStates={keyBindingsModes}
      />
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Key</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(keyBindings).map(([action, { key, code }]) => (
            <tr
              key={action}
              onClick={() => openGetter(action, key, code)}
            >
              <td>{action}</td>
              <td>{key}</td>
              <td>{code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" onClick={goToMenu}>Menu</button>
      <button type="button" onClick={resetToDefault}>Reset to Default</button>
    </div>
  );
};

export default Options;
