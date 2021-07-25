import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './style';

const ConfirmationDialog = ({ type, cancel, confirm }) => (
  <div css={styles.dialogBoxWrapper}>
    <div css={styles.dialogBox}>
      <p css={styles.dialogText}>
        {type === 'MENU' ? 'Are you sure you want to go back to the menu? All your progress will be lost.' : null}
        {type === 'RESET' ? 'Are you sure you want to reset? All your progress will be lost.' : null}
      </p>
      <div css={styles.buttonsWrapper}>
        <button type="button" onClick={cancel}>Cancel</button>
        <button type="button" onClick={confirm}>Yes</button>
      </div>
    </div>
  </div>
);

ConfirmationDialog.propTypes = {
  type: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
