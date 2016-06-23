import actionTypes from '../actionTypes';

const initialState = {
  key: 'stack',
  index: 0,
  routes: [
    { key: 'home' },
  ],
};

export default function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PUSH: {
      const newIndex = state.index + 1;
      return {
        ...state,
        index: newIndex,
        routes: state.routes.slice(0, newIndex).concat([
          action.route,
        ]),
      };
    }
    case actionTypes.POP: {
      const newIndex = state.index - 1;
      return {
        ...state,
        index: newIndex,
        routes: state.routes.slice(0, state.index),
      };
    }
    default:
      return state;
  }
}
