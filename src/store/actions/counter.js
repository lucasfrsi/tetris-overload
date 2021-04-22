import { INCREASE_COUNTER, DECREASE_COUNTER, RESET_COUNTER } from './types';

export const increaseCountAction = () => ({
  type: INCREASE_COUNTER,
});

export const decreaseCountAction = () => ({
  type: DECREASE_COUNTER,
});

export const resetCountAction = () => ({
  type: RESET_COUNTER,
});
