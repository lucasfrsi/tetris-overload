export const SCORES_KEY = 'tetrisScores';
export const OPTIONS_KEY = 'tetrisOptions';

const doesKeyExist = (key) => localStorage.getItem(key) !== null;
const getKeyValue = (key) => JSON.parse(localStorage.getItem(key));

export const setKeyValue = (key, value) => {
  const newValue = JSON.stringify(value);
  localStorage.setItem(key, newValue);
};

export const checkLocalStorageAvailability = () => {
  let storage;
  try {
    storage = window.localStorage;
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22
      || e.code === 1014
      || e.name === 'QuotaExceededError'
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      && (storage && storage.length !== 0);
  }
};

export const initializeKey = (localStorageIsAvailable, key, defaultValue) => {
  if (localStorageIsAvailable) {
    if (!doesKeyExist(key)) {
      setKeyValue(key, defaultValue);
    }
    return getKeyValue(key);
  }
  return defaultValue;
};
