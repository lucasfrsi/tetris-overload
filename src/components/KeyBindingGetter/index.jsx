/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CUSTOM_MODE } from 'utils/keyBindings';
import Button from '../Button';
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

  const showInUseMessage = () => {
    const usedKeysIsEmpty = usedKeys.size === 0;
    const usedCodesIsEmpty = usedCodes.size === 0;
    const sameInitialKey = initialKey === keyAndCode.key;
    const sameInitialCode = initialCode === keyAndCode.code;

    return inUse && !usedKeysIsEmpty && !usedCodesIsEmpty && !sameInitialKey && !sameInitialCode;
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
      <div css={styles.getter}>
        <div css={styles.text}>
          <span>Press a key to bind to the action</span>
          <span css={styles.actionStyle}>{action}</span>
          <span>Current Binding</span>
          <table>
            <tbody>
              <tr>
                <td><i>{initialKey || 'None'}</i></td>
                <td>|</td>
                <td><i>{initialCode || 'None'}</i></td>
              </tr>
            </tbody>
          </table>
          <span>New Binding</span>
          <table>
            <tbody>
              <tr>
                <td><i>{keyAndCode.key || 'None'}</i></td>
                <td>|</td>
                <td><i>{keyAndCode.code || 'None'}</i></td>
              </tr>
            </tbody>
          </table>
          {showInUseMessage() ? (
            <span css={styles.inUseStyle}>Binding already in use!</span>
          ) : (
            <span> </span>
          )}
        </div>

        <div css={styles.buttons}>
          <Button name="Cancel" onClick={cancelHandler} />
          <Button name="Confirm" onClick={confirmHandler} disabled={inUse} />
        </div>
      </div>
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
