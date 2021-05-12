import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInGameAction as setInGame } from 'store/actions/tetris';

// Custom Hooks
import { usePlayer } from 'hooks/usePlayer';
import { useStage } from 'hooks/useStage';
import { useGameStatus } from 'hooks/useGameStatus';
import { usePieceHolders } from 'hooks/usePieceHolders';
import { useControllers } from 'hooks/useControllers';
import { useTetris } from 'hooks/useTetris';
import { useSkills } from 'hooks/useSkills';

// Components
import Stage from '../Stage';
import Menu from '../Menu';
import PieceHolder from '../PieceHolder';

import { StyledTetrisWrapper, StyledTetrisLayout } from './style';

const Tetris = () => {
  const skillsAPI = useSkills();
  const gameStatusAPI = useGameStatus(skillsAPI);
  const playerAPI = usePlayer(skillsAPI);
  const stageAPI = useStage(skillsAPI, gameStatusAPI, playerAPI);
  const pieceHoldersAPI = usePieceHolders(skillsAPI, playerAPI);

  const tetrisAPI = useTetris(skillsAPI, gameStatusAPI, playerAPI, stageAPI);

  const controllersAPI = useControllers(skillsAPI, gameStatusAPI, playerAPI, stageAPI, tetrisAPI);

  const inGame = useSelector((state) => state.tetris.inGame);
  const dispatch = useDispatch();
  const goToMenu = () => dispatch(setInGame(false));

  const {
    state: {
      stage,
    },
  } = stageAPI;

  const {
    state: {
      holdStage,
      nextStage,
      queueStage,
    },
  } = pieceHoldersAPI;

  const {
    state: {
      level,
      rows,
      score,
    },
  } = gameStatusAPI;

  const {
    actions: {
      startGame,
    },
  } = tetrisAPI;

  const {
    actions: {
      onKeyDown,
      onKeyUp,
    },
  } = controllersAPI;

  const onKeyDownHandler = (event) => {
    onKeyDown(event);
  };

  const onKeyUpHandler = (event) => {
    onKeyUp(event);
  };

  return (
    inGame ? (
      <StyledTetrisWrapper
        role="button"
        tabIndex="0"
        onKeyDown={onKeyDownHandler}
        onKeyUp={onKeyUpHandler}
      >
        <StyledTetrisLayout>
          <aside>
            <PieceHolder pieceHolderStage={holdStage} />
            <div>learned skills</div>
            <button type="button" onClick={goToMenu}>menu</button>
          </aside>
          <Stage stage={stage} />
          <aside>
            <PieceHolder pieceHolderStage={nextStage} />
            <PieceHolder pieceHolderStage={queueStage} />
            <div>Score: {score}</div>
            <div>Level: {level}</div>
            <div>Lines: {rows}</div>
            <button type="button" onClick={startGame}>start</button>
          </aside>
        </StyledTetrisLayout>
      </StyledTetrisWrapper>
    ) : <Menu />
  );
};

export default Tetris;

/*
  In-game Menus
  - Pause
  - Skill Tree (pause automatically)

  TO-DOS
  3. Find a way to centralize next and queue pieces in container (create stage the size of 'em)
  5. Add controls and the ability to choose all the keys
  6. Add pause
  4. Add sound effects and cell animations
  5. Add song
  6. Style the entire game
  7. Play the game, tweak the math calculations + balance
  8. Check all the useEffect dependencies and update functions accordingly, using useCallback
  9. Rethink the tetrominos randomization (not totally random, like the original game)
  10. Improve responsiveness when pressing to drop (small delay to begin with)

  Next feats to implement:
  Then AFTER implementing learning skills + check levels
  4. Perfectionist
*/
