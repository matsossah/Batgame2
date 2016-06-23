import actionTypes from '../actionTypes';

export function push(route) {
  return {
    type: actionTypes.PUSH,
    route,
  };
}

export function pop() {
  return {
    type: actionTypes.POP,
  };
}
