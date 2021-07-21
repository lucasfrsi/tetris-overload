/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CUSTOM_MODE } from 'utils/keyBindings';
import * as styles from './style';

const KeyBindingGetter = ({
  action,
  initialKey,
  initialCode,
  changeKeyBinding,
  closeGetter,
  changeKeyBindingsMode,
}) => {
  const elementRef = useRef(null);
  const [keyAndCode, setKeyAndCode] = useState({
    key: initialKey,
    code: initialCode,
  });

  const captureKeyAndCode = (e) => {
    setKeyAndCode({
      key: e.key,
      code: e.code,
    });
  };

  const cancelHandler = () => {
    closeGetter();
  };

  const confirmHandler = () => {
    changeKeyBinding(action, keyAndCode.key, keyAndCode.code);
    changeKeyBindingsMode(CUSTOM_MODE);
    closeGetter();
  };

  useEffect(() => {
    elementRef.current.focus();
  }, []);

  return (
    <div
      ref={elementRef}
      css={styles.getterWrapper}
      role="presentation"
      tabIndex={0}
      onKeyDown={(e) => captureKeyAndCode(e)}
      onBlur={() => elementRef.current.focus()}
    >
      Action: {action} | Key: {keyAndCode.key} | Code: {keyAndCode.code}
      <button type="button" onClick={cancelHandler}>Cancel</button>
      <button type="button" onClick={confirmHandler}>Confirm</button>
    </div>
  );
};

KeyBindingGetter.propTypes = {
  action: PropTypes.string.isRequired,
  initialKey: PropTypes.string.isRequired,
  initialCode: PropTypes.string.isRequired,
  changeKeyBinding: PropTypes.func.isRequired,
  closeGetter: PropTypes.func.isRequired,
  changeKeyBindingsMode: PropTypes.func.isRequired,
};

export default KeyBindingGetter;
