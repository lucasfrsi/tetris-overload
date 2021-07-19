import React from 'react';
import PropTypes from 'prop-types';
import sfxOn from 'assets/icons/sfx_on.svg';
import sfxOff from 'assets/icons/sfx_off.svg';
import musicOn from 'assets/icons/music_on.svg';
import musicOff from 'assets/icons/music_off.svg';
import github from 'assets/icons/github.svg';
import linkedin from 'assets/icons/linkedin.svg';
import { BUTTON_HOVER, BUTTON_SELECT, BUTTON_TOGGLE } from 'utils/SFXPaths';

import * as styles from './style';

const Menu = ({ play, SFX, BGM, toggleSFX, toggleBGM, playSFX }) => {
  function onHoverHandler() {
    playSFX(BUTTON_HOVER);
  }

  function onClickHandler(action, SFXType) {
    playSFX(SFXType);
    if (action !== null) action();
  }

  return (
    <div css={styles.menu}>
      <span css={styles.title}>Tetris</span>
      <span css={styles.title}>Overload</span>
      <div css={styles.buttons}>
        <button type="button" tabIndex={-1} onClick={() => onClickHandler(play, BUTTON_SELECT)} onMouseEnter={onHoverHandler}>Play</button>
        <button type="button" tabIndex={-1} onClick={() => onClickHandler(null, BUTTON_SELECT)} onMouseEnter={onHoverHandler}>Options</button>
        <button type="button" tabIndex={-1} onClick={() => onClickHandler(null, BUTTON_SELECT)} onMouseEnter={onHoverHandler}>Credits</button>
        <div css={styles.icons}>
          <img
            role="presentation"
            src={SFX ? sfxOff : sfxOn}
            alt={SFX ? 'sfx off' : 'sfx on'}
            draggable={false}
            onClick={() => onClickHandler(toggleSFX, BUTTON_TOGGLE)}
            onKeyDown={() => {}}
          />
          <img
            role="presentation"
            src={BGM ? musicOff : musicOn}
            alt={BGM ? 'music off' : 'music on'}
            draggable={false}
            onClick={() => onClickHandler(toggleBGM, BUTTON_TOGGLE)}
            onKeyDown={() => {}}
          />
        </div>
      </div>
      <div css={styles.madeWithLove}>
        <span>
          made by&nbsp;
          <a href="https://lucasfrsi.com/" target="_blank" rel="noopener noreferrer">
            @lucasfrsi
          </a>
        </span>
        <a href="https://github.com/lucasfrsi" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="" />
        </a>
        <a href="https://linkedin.com/in/lucasfrsi" target="_blank" rel="noopener noreferrer">
          <img src={linkedin} alt="" />
        </a>
      </div>
    </div>
  );
};

Menu.propTypes = {
  play: PropTypes.func.isRequired,
  SFX: PropTypes.bool.isRequired,
  BGM: PropTypes.bool.isRequired,
  toggleSFX: PropTypes.func.isRequired,
  toggleBGM: PropTypes.func.isRequired,
  playSFX: PropTypes.func.isRequired,
};

export default Menu;
