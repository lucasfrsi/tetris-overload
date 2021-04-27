import React from 'react';
import { useDispatch } from 'react-redux';
import { setInGameAction } from 'store/actions/tetris';

const Menu = () => {
  const dispatch = useDispatch();

  const startGame = () => {
    dispatch(setInGameAction(true));
  };

  return (
    <div>
      <button type="button" onClick={startGame}>New Game</button>
      <button type="button">Load Game</button>
      <button type="button">Options</button>
      <button type="button">Credits</button>
    </div>
  );
};

export default Menu;
