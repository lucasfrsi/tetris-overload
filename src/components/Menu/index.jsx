import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setInGameAction } from 'store/actions/tetris';
import sfxOn from 'assets/sfx_on.svg';
import sfxOff from 'assets/sfx_off.svg';
import musicOn from 'assets/music_on.svg';
import musicOff from 'assets/music_off.svg';

import * as styles from './style';

const Menu = () => {
  const [sfx, setSfx] = useState(false);
  const [music, setMusic] = useState(false);

  const dispatch = useDispatch();

  const startGame = () => {
    dispatch(setInGameAction(true));
  };

  return (
    <div css={styles.menu}>
      <span css={styles.title}>Tetris</span>
      <span css={styles.title}>Overload</span>
      <button type="button" onClick={startGame}>Play</button>
      <button type="button">Options</button>
      <button type="button">Credits</button>
      <div>
        <img
          role="presentation"
          src={sfx ? sfxOff : sfxOn}
          alt={sfx ? 'sfx off' : 'sfx on'}
          draggable={false}
          onClick={() => setSfx((prev) => !prev)}
          onKeyDown={() => {}}
        />
        <img
          role="presentation"
          src={music ? musicOff : musicOn}
          alt={music ? 'music off' : 'music on'}
          draggable={false}
          onClick={() => setMusic((prev) => !prev)}
          onKeyDown={() => {}}
        />
      </div>
    </div>
  );
};

export default Menu;
