import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  switchOn: true,
};

const actionsMap = {
  [ActionTypes.OPEN_SWITCH](state, action) {
    return Object.assign({}, state, { switchOn: true });
  },
  [ActionTypes.CLOSE_SWITCH](state, action) {
    return Object.assign({}, state, { switchOn: false });
  },
};

export default function newTab(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
