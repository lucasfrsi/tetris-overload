import React, { useState } from 'react';
import PropTypes from 'prop-types';
import sfxOn from 'assets/sfx_on.svg';
import sfxOff from 'assets/sfx_off.svg';
import musicOn from 'assets/music_on.svg';
import musicOff from 'assets/music_off.svg';

import * as styles from './style';

const Menu = ({ play, SFX, BGM, toggleSFX, toggleBGM }) => (
  <div css={styles.menu}>
    <span css={styles.title}>Tetris</span>
    <span css={styles.title}>Overload</span>
    <button type="button" onClick={play}>Play</button>
    <button type="button">Options</button>
    <button type="button">Credits</button>
    <div>
      <h3>BGM: {BGM ? 'muted' : 'unmuted'}</h3>
      <h3>SFX: {SFX ? 'muted' : 'unmuted'}</h3>
      <img
        role="presentation"
        src={SFX ? sfxOff : sfxOn}
        alt={SFX ? 'sfx off' : 'sfx on'}
        draggable={false}
        onClick={toggleSFX}
        onKeyDown={() => {}}
      />
      <img
        role="presentation"
        src={BGM ? musicOff : musicOn}
        alt={BGM ? 'music off' : 'music on'}
        draggable={false}
        onClick={toggleBGM}
        onKeyDown={() => {}}
      />
    </div>
  </div>
);

Menu.propTypes = {
  play: PropTypes.func.isRequired,
  SFX: PropTypes.bool.isRequired,
  BGM: PropTypes.bool.isRequired,
  toggleSFX: PropTypes.func.isRequired,
  toggleBGM: PropTypes.func.isRequired,
};

export default Menu;
