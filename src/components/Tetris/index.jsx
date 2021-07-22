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
import { useOptions } from 'hooks/useOptions';

// Utils
import { MENU_PAGE, OPTIONS_PAGE, INGAME_PAGE } from 'utils/pagesMap';
import { checkLocalStorageAvailability } from 'utils/localStorage';

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
import Options from '../Options';

import {
  StyledTetrisLayout,
  StyledTetrisWrapper,
  StyledButtonsWrapper,
  StyledScoresWrapper,
  StyledNextPiecesWrapper,
  StyledHoldWrapper,
  StyledSkillsWrapper,
} from './style';

const isLocalStorageAvailable = checkLocalStorageAvailability();

const Tetris = () => {
  const BGM_API = useBGM();
  const SFX_API = useSFX();

  const optionsAPI = useOptions({ BGM_API, SFX_API, isLocalStorageAvailable });

  const skillsAPI = useSkills({ SFX_API });
  const gameStatusAPI = useGameStatus({ skillsAPI, SFX_API, isLocalStorageAvailable });
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
    optionsAPI,
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
      currentPage,
    },
  } = gameStatusAPI;

  const {
    actions: {
      goToTetris,
      goToOptions,
      goToMenu,
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
    <>
      {currentPage === INGAME_PAGE ? (
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
          {paused && <Pause dialog={dialogIsOpen.state} />}
          {dialogIsOpen.state && (
            <ConfirmationDialog
              type={dialogIsOpen.type}
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
                  ? <SideButton buttonName={paused ? 'unpause' : 'pause'} onClick={handlePauseButton} playSFX={playSFX} />
                  : <SideButton buttonName="start" onClick={handleStartButton} playSFX={playSFX} />}
                <SideButton buttonName="reset" onClick={handleResetButton} playSFX={playSFX} disabled={!gameStarted} />
                <SideButton buttonName="menu" onClick={handleMenuButton} playSFX={playSFX} />
              </StyledButtonsWrapper>
            </aside>
          </StyledTetrisLayout>
        </StyledTetrisWrapper>
      ) : null}
      {currentPage === MENU_PAGE ? (
        <Menu
          play={goToTetris}
          options={goToOptions}
          SFX={SFX.mute}
          BGM={BGM.mute}
          toggleSFX={toggleMuteSFX}
          toggleBGM={toggleMuteBGM}
          playSFX={playSFX}
        />
      ) : null}
      {currentPage === OPTIONS_PAGE ? (
        <Options optionsAPI={optionsAPI} goToMenu={goToMenu} />
      ) : null}
    </>
  );
};

export default Tetris;

/*
  TO-DOS
  0. Add the game modes changes (I only added it to the options)
  0a. Add key bindings to lvl skills? Add to skills the keybindings to!
  2. Check all the useEffect dependencies and update functions accordingly, using useCallback
  3. Perfectionist
  4. Play the game, tweak the math calculations + balance
  5. Add media query for up to 625px of height
  6. Activate fullscreen mode automatically??
  7. Blur skill and side buttons onClick
  8. Remove focus styling on buttons
*/
