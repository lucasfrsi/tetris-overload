import { useInterval } from 'hooks/useInterval';
import { checkCollision, createMainStage } from 'utils/gameHelpers';
import { TETROMINO_MERGE, TETROMINO_MOVE } from 'utils/SFXPaths';

export const useTetris = ({ skillsAPI, gameStatusAPI, playerAPI, stageAPI, SFX_API, BGM_API }) => {
  const {
    state: {
      player,
    },
    actions: {
      updatePlayerPos,
      resetPlayer,
    },
  } = playerAPI;

  const {
    state: {
      stage,
    },
    actions: {
      setStage,
    },
  } = stageAPI;

  const {
    state: {
      level,
      rows,
      dropTime,
      paused,
    },
    actions: {
      setLevel,
      setRows,
      setScore,
      setGameOver,
      setDropTime,
    },
  } = gameStatusAPI;

  const {
    state: {
      timeStop,
    },
    actions: {
      resetSkills,
    },
  } = skillsAPI;

  const {
    actions: {
      playSFX,
    },
  } = SFX_API;

  const {
    actions: {
      playBGM,
      stopBGM,
    },
  } = BGM_API;

  const movePlayer = (xDir, yDir = 0) => {
    if (!checkCollision(player, stage, { x: xDir, y: yDir })) {
      updatePlayerPos({ x: xDir, y: yDir });
      playSFX(TETROMINO_MOVE);
    }
  };

  const resetGame = () => {
    resetSkills();
    setStage(createMainStage());
    setGameOver(false);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setDropTime(null);
    stopBGM();
  };

  const startGame = () => {
    resetGame();
    setDropTime(1000);
    playBGM();
  };

  // separate start game from reset game
  // reset everything when leaving ingame
  // popup for confirmation when leaving
  // maybe removing start button once game is running?

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        stopBGM();
      }
      updatePlayerPos({ x: 0, y: 0, collided: !timeStop.active });
      playSFX(TETROMINO_MERGE);
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  useInterval(() => {
    if (!paused && !timeStop.active) drop();
  }, dropTime);

  return {
    actions: {
      dropPlayer,
      movePlayer,
      startGame,
      setDropTime,
    },
  };
};
