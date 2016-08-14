import actionTypes from '../actionTypes';
import { NavigationExperimental } from 'react-native';

const { StateUtils } = NavigationExperimental;

const initialState = {
  main: {
    key: 'stack',
    index: 0,
    routes: [
      {
        key: 'home',
        type: 'home',
      },
    ],
  },
  modals: {
    key: 'modals',
    index: 0,
    routes: [
      {
        key: 'main',
        type: 'main',
      },
    ],
  },
};

export default function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.POP_MODALS:
      return {
        main: state.main,
        modals: StateUtils.pop(state.modals),
      };
    case actionTypes.POP_MAIN:
      return {
        main: StateUtils.pop(state.main),
        modals: state.modals,
      };
    case actionTypes.GOTO_PICK_OPPONENT:
      return {
        main: state.main,
        modals: StateUtils.reset(
          state.modals,
          initialState.modals.routes.concat([{
            key: 'pick_opponent',
            type: 'pick_opponent',
          }])
        ),
      };
    case actionTypes.GOTO_SEARCH_SCREEN:
      return {
        main: state.main,
        modals: StateUtils.reset(
          state.modals,
          initialState.modals.routes.concat([{
            key: 'search_screen',
            type: 'search_screen',
          }])
        ),
      };
    case actionTypes.GOTO_MATCH: {
      const key = `match_${action.matchId}`;
      let main;
      if (StateUtils.has(state.main, key)) {
        main = StateUtils.jumpTo(state.main, key);
      } else {
        main = StateUtils.push(state.main, {
          key: `match_${action.matchId}`,
          type: 'match',
          matchId: action.matchId,
        });
      }
      return {
        main,
        modals: initialState.modals,
      };
    }
    case actionTypes.GOTO_WHEEL:
      return {
        main: state.main,
        modals: StateUtils.push(state.modals, {
          key: `wheel_${action.gameId}`,
          type: 'wheel',
          matchId: action.matchId,
          roundId: action.roundId,
          gameId: action.gameId,
        }),
      };
    case actionTypes.GOTO_GAME:
      return {
        main: state.main,
        modals: StateUtils.push(state.modals, {
          key: `game_${action.gameId}`,
          type: 'game',
          matchId: action.matchId,
          roundId: action.roundId,
          gameId: action.gameId,
        }),
      };
    default:
      return state;
  }
}
