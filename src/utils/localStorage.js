const KEY = 'scores';
const DEFAULT_VALUE = [];

const keyExist = () => localStorage.getItem(KEY) !== null;
const getKeyValue = () => JSON.parse(localStorage.getItem(KEY));

/**
 * Set a new value for 'scores' key on localStorage
 * @param   Array of numbers
 * @return  void
 */
export const setKeyValue = (array) => {
  const newValue = JSON.stringify(array);
  localStorage.setItem(KEY, newValue);
};

/**
 * Check if localStorage is available
 * @return  Boolean
 */
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

/**
 * Initialize scores based on localStorage availability
 * @param   Boolean
 * @return  An empty array or an array of numbers
 */
export const initializeScores = (localStorageIsAvailable) => {
  if (localStorageIsAvailable) {
    if (!keyExist()) {
      setKeyValue(DEFAULT_VALUE);
    }
    return getKeyValue();
  }
  return DEFAULT_VALUE;
};
