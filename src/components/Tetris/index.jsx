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
import Skills from '../Skills';
import Score from '../Score';
import Pause from '../Pause';
import SideButton from '../SideButton';
import ConfirmationDialog from '../ConfirmationDialog';
import Countdown from '../Countdown';
import GameOver from '../GameOver';
import HighScores from '../HighScores';

import {
  StyledTetrisLayout,
  StyledTetrisWrapper,
  StyledButtonsWrapper,
  StyledScoresWrapper,
  StyledNextPiecesWrapper,
  StyledHoldWrapper,
  StyledSkillsWrapper,
} from './style';

const Tetris = () => {
  const BGM_API = useBGM();
  const SFX_API = useSFX();

  const skillsAPI = useSkills({ SFX_API });
  const gameStatusAPI = useGameStatus({ skillsAPI, SFX_API });
  const playerAPI = usePlayer({ SFX_API });
  const stageAPI = useStage({ skillsAPI, gameStatusAPI, playerAPI });
  const pieceHoldersAPI = usePieceHolders({ skillsAPI, playerAPI });
  const tetrisAPI = useTetris({
    skillsAPI, gameStatusAPI, playerAPI, stageAPI, pieceHoldersAPI, SFX_API, BGM_API,
  });

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
      clairvoyance,
      pixelPocket,
    },
    skills,
    actions: {
      canSkillBeLeveled,
      levelUpSkill,
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
      firstOnQueueStage,
      secondOnQueueStage,
      thirdOnQueueStage,
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
      handleHighScoresMenuButton,
      handlePlayAgainButton,
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
        {showHighScores && (
          <HighScores
            scores={storedScores}
            newHighScore={newHighScore}
            menuButtonAction={handleHighScoresMenuButton}
            playAgainButtonAction={handlePlayAgainButton}
            playSFX={playSFX}
          />
        )}
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
            {pixelPocket.currentLevel ? (
              <>
                <StyledHoldWrapper>
                  <span>Hold</span>
                  <PieceHolder pieceHolderStage={holdStage} />
                </StyledHoldWrapper>
              </>
            ) : null}
            <StyledSkillsWrapper>
              <Score name="Experience" value={exp} />
              {/* <hr /> */}
              <Skills
                skills={skills}
                canSkillBeLeveled={canSkillBeLeveled}
                levelUpSkill={levelUpSkill}
              />
            </StyledSkillsWrapper>
          </aside>
          <Stage stage={stage} />
          <aside>
            {clairvoyance.currentLevel ? (
              <StyledNextPiecesWrapper>
                <span>Next</span>
                <PieceHolder pieceHolderStage={firstOnQueueStage} />
                <PieceHolder pieceHolderStage={secondOnQueueStage} />
                <PieceHolder pieceHolderStage={thirdOnQueueStage} />
              </StyledNextPiecesWrapper>
            ) : null}
            <hr />
            <StyledScoresWrapper>
              <Score name="Score" value={score} />
              <Score name="Level" value={level} />
              <Score name="Rows" value={rows} />
            </StyledScoresWrapper>
            <hr />
            <StyledButtonsWrapper>
              {(onCountdown || gameStarted || paused)
                ? <SideButton buttonName={paused ? 'unpause' : 'pause'} onClick={handlePauseButton} playSFX={playSFX} playSFXOnClick={false} />
                : <SideButton buttonName="start" onClick={handleStartButton} playSFX={playSFX} start />}
              <SideButton buttonName="reset" onClick={handleResetButton} playSFX={playSFX} disabled={!gameStarted} />
              <SideButton buttonName="menu" onClick={handleMenuButton} playSFX={playSFX} playSFXOnClick={false} />
            </StyledButtonsWrapper>
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
  2. Design the pop-up message to alert the player that a skill is up
    - Only for Mimic and Perfectionism?
  3. Think of how props and states are managed, how to improve performance?
    - Would it be better not to pass the entire API, and only some actions?
  3. Find a way to centralize next and queue pieces in container (create stage the size of 'em)
  4. Add cell animations?
  7. Play the game, tweak the math calculations + balance
  5. Add controls and the ability to choose all the keys
  x. Add switch case in place of all the ifs (use switch(true))
  8. Check all the useEffect dependencies and update functions accordingly, using useCallback
  9. Rethink the tetrominos randomization (not totally random, like the original game)
  10. Improve responsiveness when pressing to drop (small delay to begin with)
    a. Make useInterval ACCURATE (check bookmarks)
    b. Move from using setState, avoiding async calls

  x. Add Reat.memo to reusable components: score, skill, button, etc.
  xx. Add pixel art icons in menu: github and linkedin
  xxx. Add made by lucasfrsi or something like that too! (+ date)
  xxxx. Make a favicon

  11. Add same style from highscores to dialog confirmation (the box style)

  Next feats to implement:
  4. Perfectionist

  Refactor:
  1. How useSkills are being exported, use the new version
*/
