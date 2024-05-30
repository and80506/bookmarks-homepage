import * as types from '../constants/ActionTypes';

export function openSwitch() {
  return { type: types.OPEN_SWITCH };
}

export function closeSwitch() {
  return { type: types.CLOSE_SWITCH };
}
