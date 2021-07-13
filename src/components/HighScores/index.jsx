import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_SELECT, BUTTON_HOVER, BUTTON_START } from 'utils/SFXPaths';
import * as styles from './style';

const HighScores = ({ scores, newHighScore, menuButtonAction, playAgainButtonAction, playSFX }) => (
  <div css={styles.highScoresWrapper}>
    <div css={styles.highScoresBox}>
      {newHighScore && (
        <div css={styles.newHighScoreBox}>
          <h1>new high score!</h1>
          <span>{scores[0]}</span>
        </div>
      )}

      <table css={styles.highScoresTable}>
        <thead>
          <tr>
            <th>High Scores</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index}>
              <td>{index + 1}. {score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div css={styles.highScoresButtons}>
        <button
          type="button"
          tabIndex={-1}
          onMouseEnter={() => playSFX(BUTTON_HOVER)}
          onClick={() => {
            menuButtonAction();
            playSFX(BUTTON_SELECT);
          }}
        >
          Menu
        </button>
        <button
          type="button"
          tabIndex={-1}
          onMouseEnter={() => playSFX(BUTTON_HOVER)}
          onClick={() => {
            playAgainButtonAction();
            playSFX(BUTTON_START);
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  </div>
);

HighScores.propTypes = {
  scores: PropTypes.arrayOf(PropTypes.number).isRequired,
  newHighScore: PropTypes.bool.isRequired,
  menuButtonAction: PropTypes.func.isRequired,
  playAgainButtonAction: PropTypes.func.isRequired,
  playSFX: PropTypes.func.isRequired,
};

export default HighScores;