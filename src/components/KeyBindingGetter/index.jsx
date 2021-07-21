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
  usedKeys,
  usedCodes,
}) => {
  const elementRef = useRef(null);
  const [keyAndCode, setKeyAndCode] = useState({
    key: initialKey,
    code: initialCode,
  });
  const [inUse, setInUse] = useState(true);

  const captureKeyAndCode = (e) => {
    setKeyAndCode({
      key: e.key,
      code: e.code,
    });

    if (usedKeys.has(e.key) || usedCodes.has(e.code)) {
      setInUse(true);
    } else {
      setInUse(false);
    }
  };

  const cancelHandler = () => {
    closeGetter();
  };

  const confirmHandler = () => {
    if (!inUse) {
      changeKeyBinding(action, keyAndCode.key, keyAndCode.code);
      changeKeyBindingsMode(CUSTOM_MODE);
      closeGetter();
    }
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
      <h3>{inUse ? 'ALREADY IN USE' : 'OKAY'}</h3>
      Action: {action} | Key: {keyAndCode.key} | Code: {keyAndCode.code}
      <button type="button" onClick={cancelHandler}>Cancel</button>
      <button type="button" disabled={inUse} onClick={confirmHandler}>Confirm</button>
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
  usedKeys: PropTypes.instanceOf(Set).isRequired,
  usedCodes: PropTypes.instanceOf(Set).isRequired,
};

export default KeyBindingGetter;
