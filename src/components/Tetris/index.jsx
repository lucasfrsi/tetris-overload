import React from 'react';

// Custom Hooks
import { usePlayer } from 'hooks/usePlayer';
import { useStage } from 'hooks/useStage';
import { useGameStatus } from 'hooks/useGameStatus';
import { usePieceHolders } from 'hooks/usePieceHolders';
import { useControllers } from 'hooks/useControllers';
import { useTetris } from 'hooks/useTetris';
import { useSkills } from 'hooks/useSkills';
import { useTimers } from 'hooks/useTimers';
import { useBGM } from 'hooks/useBGM';
import { useSFX } from 'hooks/useSFX';

// Components
import Stage from '../Stage';
import Menu from '../Menu';
import PieceHolder from '../PieceHolder';
import Skills from '../SkillsContainer';
import Score from '../Score';
import Pause from '../Pause';
import SideButton from '../SideButton';
import ConfirmationDialog from '../ConfirmationDialog';
import Countdown from '../Countdown';
import GameOver from '../GameOver';
import HighScores from '../HighScores';

import { StyledTetrisLayout, StyledTetrisWrapper } from './style';

const Tetris = () => {
  const BGM_API = useBGM();
  const SFX_API = useSFX();

  const skillsAPI = useSkills({ SFX_API });
  const gameStatusAPI = useGameStatus({ skillsAPI, SFX_API });
  const playerAPI = usePlayer({ skillsAPI, SFX_API });
  const stageAPI = useStage({ skillsAPI, gameStatusAPI, playerAPI });
  const pieceHoldersAPI = usePieceHolders({ skillsAPI, playerAPI });
  const tetrisAPI = useTetris({ skillsAPI, gameStatusAPI, playerAPI, stageAPI, SFX_API, BGM_API });

  const timersAPI = useTimers({ skillsAPI, gameStatusAPI, tetrisAPI, SFX_API });

  const controllersAPI = useControllers({
    skillsAPI,
    gameStatusAPI,
    playerAPI,
    stageAPI,
    tetrisAPI,
    SFX_API,
  });

  const {
    state: {
      BGM,
    },
    actions: {
      toggleMuteBGM,
    },
  } = BGM_API;

  const {
    state: {
      SFX,
    },
    actions: {
      toggleMuteSFX,
      playSFX,
    },
  } = SFX_API;

  const {
    state: {
      exp,
    },
  } = skillsAPI;

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
      paused,
      dialogIsOpen,
      onCountdown,
      gameStarted,
      gameOver,
      showHighScores,
      storedScores,
      newHighScore,
    },
  } = gameStatusAPI;

  const {
    state: {
      inGame,
    },
    actions: {
      goToTetris,
      handleMenuButton,
      confirmDialog,
      cancelDialog,
      handleStartButton,
      handlePauseButton,
      handleResetButton,
    },
  } = tetrisAPI;

  const {
    actions: {
      onKeyDown,
      onKeyUp,
    },
  } = controllersAPI;

  const {
    state: {
      countdown,
    },
  } = timersAPI;

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
        {gameOver && <GameOver />}
        {showHighScores && <HighScores scores={storedScores} newHighScore={newHighScore} />}
        {onCountdown && <Countdown count={countdown} playSFX={playSFX} />}
        {paused && <Pause dialog={dialogIsOpen} />}
        {dialogIsOpen && (
          <ConfirmationDialog
            cancel={cancelDialog}
            confirm={confirmDialog}
          />
        )}
        <StyledTetrisLayout>
          <aside>
            <PieceHolder pieceHolderStage={holdStage} />
            <Score name="Experience" value={exp} />
            <Skills skillsAPI={skillsAPI} />
          </aside>
          <Stage stage={stage} />
          <aside>
            <PieceHolder pieceHolderStage={nextStage} />
            <PieceHolder pieceHolderStage={queueStage} />
            <Score name="Score" value={score} />
            <Score name="Level" value={level} />
            <Score name="Rows" value={rows} />
            {(onCountdown || gameStarted || paused)
              ? <SideButton buttonName={paused ? 'unpause' : 'pause'} onClick={handlePauseButton} playSFX={playSFX} playSFXOnClick={false} />
              : <SideButton buttonName="start" onClick={handleStartButton} playSFX={playSFX} />}
            <SideButton buttonName="reset" onClick={handleResetButton} playSFX={playSFX} disabled={!gameStarted} />
            <SideButton buttonName="menu" onClick={handleMenuButton} playSFX={playSFX} playSFXOnClick={false} />
          </aside>
        </StyledTetrisLayout>
      </StyledTetrisWrapper>
    ) : (
      <Menu
        play={goToTetris}
        SFX={SFX.mute}
        BGM={BGM.mute}
        toggleSFX={toggleMuteSFX}
        toggleBGM={toggleMuteBGM}
        playSFX={playSFX}
      />
    )
  );
};

export default Tetris;

/*
  TO-DOS
  3. Find a way to centralize next and queue pieces in container (create stage the size of 'em)
  4. Add sound effects and cell animations
  6. Style the entire game
  7. Play the game, tweak the math calculations + balance
  5. Add controls and the ability to choose all the keys
  x. Add switch case in place of all the ifs (use switch(true))
  8. Check all the useEffect dependencies and update functions accordingly, using useCallback
  9. Rethink the tetrominos randomization (not totally random, like the original game)
  10. Improve responsiveness when pressing to drop (small delay to begin with)
    a. Make useInterval ACCURATE (check bookmarks)
    b. Move from using setState, avoiding async calls

  Next feats to implement:
  4. Perfectionist

  Refactor:
  1. How useSkills are being exported, use the new version
*/
