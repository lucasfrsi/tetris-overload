import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
      usedKeys,
      usedCodes,
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
    },
  } = optionsAPI;

  const goBackToMenu = () => {
    if (trackersAreFilled()) {
      saveOptionsToLocalStorage();
      goToMenu();
    }
  };

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
          usedKeys={usedKeys}
          usedCodes={usedCodes}
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

      <button type="button" onClick={clearKeyBindings}>Clear Key Bindings</button>
      <button type="button" onClick={goBackToMenu} disabled={!trackersAreFilled()}>Save and Return</button>
      <button type="button" onClick={resetToDefault}>Reset to Default</button>
    </div>
  );
};

Options.propTypes = {
  optionsAPI: PropTypes.shape({
    state: PropTypes.shape({
      BGMSlider: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        step: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      }),
      SFXSlider: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        step: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      }),
      gameModes: PropTypes.arrayOf(PropTypes.string).isRequired,
      gameMode: PropTypes.string.isRequired,
      keyBindingsModes: PropTypes.arrayOf(PropTypes.string).isRequired,
      keyBindingsMode: PropTypes.string.isRequired,
      keyBindings: PropTypes.objectOf(PropTypes.object),
      usedKeys: PropTypes.instanceOf(Set).isRequired,
      usedCodes: PropTypes.instanceOf(Set).isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      changeBGMSliderValue: PropTypes.func.isRequired,
      changeSFXSliderValue: PropTypes.func.isRequired,
      changeGameMode: PropTypes.func.isRequired,
      changeKeyBindingsMode: PropTypes.func.isRequired,
      changeKeyBinding: PropTypes.func.isRequired,
      resetToDefault: PropTypes.func.isRequired,
      saveOptionsToLocalStorage: PropTypes.func.isRequired,
      clearKeyBindings: PropTypes.func.isRequired,
      trackersAreFilled: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  goToMenu: PropTypes.func.isRequired,
};

export default Options;

// Add SFX to buttons
