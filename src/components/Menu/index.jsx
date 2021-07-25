import React from 'react';
import PropTypes from 'prop-types';
import sfxOn from 'assets/icons/sfx_on.svg';
import sfxOff from 'assets/icons/sfx_off.svg';
import musicOn from 'assets/icons/bgm_on.svg';
import musicOff from 'assets/icons/bgm_off.svg';
import github from 'assets/icons/github.svg';
import linkedin from 'assets/icons/linkedin.svg';
import { BUTTON_HOVER, BUTTON_SELECT } from 'utils/SFXPaths';
import SVGToggleButton from 'components/SVGToggleButton';

import * as styles from './style';

const Menu = ({ play, options, SFX, BGM, toggleSFX, toggleBGM, playSFX }) => {
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
      <div css={styles.menuOptions}>
        <div css={styles.buttons}>
          <button type="button" tabIndex={-1} onClick={() => onClickHandler(play, BUTTON_SELECT)} onMouseEnter={onHoverHandler}>Play</button>
          <button type="button" tabIndex={-1} onClick={() => onClickHandler(options, BUTTON_SELECT)} onMouseEnter={onHoverHandler}>Options</button>
          <button type="button" tabIndex={-1} disabled>Credits <span>soon&trade;</span></button>
        </div>
        <div css={styles.icons}>
          <SVGToggleButton
            state={!SFX}
            SVGOn={sfxOn}
            SVGOff={sfxOff}
            toggleAction={toggleSFX}
            altOn="sfx on"
            altOff="sfx off"
            playSFX={playSFX}
          />
          <SVGToggleButton
            state={!BGM}
            SVGOn={musicOn}
            SVGOff={musicOff}
            toggleAction={toggleBGM}
            altOn="music on"
            altOff="music off"
            playSFX={playSFX}
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
  options: PropTypes.func.isRequired,
  SFX: PropTypes.bool.isRequired,
  BGM: PropTypes.bool.isRequired,
  toggleSFX: PropTypes.func.isRequired,
  toggleBGM: PropTypes.func.isRequired,
  playSFX: PropTypes.func.isRequired,
};

export default Menu;
