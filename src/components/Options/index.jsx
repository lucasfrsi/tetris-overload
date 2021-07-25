import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Icons
import sfxOn from 'assets/icons/sfx_on.svg';
import sfxOff from 'assets/icons/sfx_off.svg';
import musicOn from 'assets/icons/bgm_on.svg';
import musicOff from 'assets/icons/bgm_off.svg';

// Styles
import * as styles from './style';

// Components
import Picker from '../Picker';
import SVGToggleButton from '../SVGToggleButton';
import KeyBindingGetter from '../KeyBindingGetter';
import Button from '../Button';

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
      SFX,
      BGM,
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
    <div css={styles.optionsWrapper}>
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
      <table css={styles.optionsTable}>
        <thead>
          <tr>
            <th colSpan="2">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Game Mode</td>
            <td>
              <Picker
                state={gameMode}
                changeState={changeGameMode}
                possibleStates={gameModes}
                playSFX={playSFX}
              />
            </td>
          </tr>
          <tr>
            <td>SFX Volume</td>
            <td>
              <div css={styles.sliderWrapper}>
                <input
                  tabIndex={-1}
                  css={styles.slider}
                  type="range"
                  min={SFXSlider.min}
                  max={SFXSlider.max}
                  step={SFXSlider.step}
                  value={SFXSlider.value}
                  onChange={(e) => changeSFXSliderValue(e.target.value)}
                />
                <span css={styles.sliderValue}>{parseInt(SFXSlider.value * 100, 10)}%</span>
                <SVGToggleButton
                  state={!SFX}
                  SVGOn={sfxOn}
                  SVGOff={sfxOff}
                  toggleAction={toggleMuteSFX}
                  altOn="sfx on"
                  altOff="sfx off"
                  playSFX={playSFX}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>BGM Volume</td>
            <td>
              <div css={styles.sliderWrapper}>
                <input
                  tabIndex={-1}
                  css={styles.slider}
                  type="range"
                  min={BGMSlider.min}
                  max={BGMSlider.max}
                  step={BGMSlider.step}
                  value={BGMSlider.value}
                  onChange={(e) => changeBGMSliderValue(e.target.value)}
                />
                <span css={styles.sliderValue}>{parseInt(BGMSlider.value * 100, 10)}%</span>
                <SVGToggleButton
                  state={!BGM}
                  SVGOn={musicOn}
                  SVGOff={musicOff}
                  toggleAction={toggleMuteBGM}
                  altOn="bgm on"
                  altOff="bgm off"
                  playSFX={playSFX}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Key Bindings</td>
            <td>
              <Picker
                state={keyBindingsMode}
                changeState={changeKeyBindingsMode}
                possibleStates={keyBindingsModes}
                playSFX={playSFX}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table css={styles.keyBindingsTable}>
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
      <div css={styles.finalButtons}>
        <Button name="Save and Return" onClick={goBackToMenu} disabled={!trackersAreFilled()} />
        <Button name="Reset to Default" onClick={resetToDefault} />
        <Button name="Unbind Keys" onClick={clearKeyBindings} />
      </div>
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
      SFX: PropTypes.bool.isRequired,
      BGM: PropTypes.bool.isRequired,
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
      toggleMuteBGM: PropTypes.func.isRequired,
      toggleMuteSFX: PropTypes.func.isRequired,
      playSFX: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  goToMenu: PropTypes.func.isRequired,
};

export default Options;
