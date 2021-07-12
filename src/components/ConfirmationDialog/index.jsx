import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './style';

const ConfirmationDialog = ({ cancel, confirm }) => (
  <div css={styles.dialogBoxWrapper}>
    <div css={styles.dialogBox}>
      <p css={styles.dialogText}>
        Are you sure you want to go back to the menu?
        All your progress will be lost.
      </p>
      <div css={styles.buttonsWrapper}>
        <button type="button" onClick={cancel}>Cancel</button>
        <button type="button" onClick={confirm}>Yes</button>
      </div>
    </div>
  </div>
);

ConfirmationDialog.propTypes = {
  cancel: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
