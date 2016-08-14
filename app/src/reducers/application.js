import actionTypes from '../actionTypes';
import createNormalize from 'shared/normalize';
import Parse from 'parse/react-native';

const initialState = {
  userId: null,
  shouldAuthenticate: false,
  installation: null,
  users: {},
  matches: {},
  rounds: {},
  games: {},
  scores: {},
};

const normalize = createNormalize(Parse);

function mergeStoreIntoState(state, store) {
  return {
    ...state,
    users: {
      ...state.users,
      ...store[Parse.User.className],
    },
    matches: {
      ...state.matches,
      ...store.Match,
    },
    rounds: {
      ...state.rounds,
      ...store.Round,
    },
    games: {
      ...state.games,
      ...store.Game,
    },
    scores: {
      ...state.scores,
      ...store.GameScore,
    },
  };
}

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INSTALLATION_REGISTERED_SUCCESS: {
      return {
        ...state,
        installation: {
          deviceType: action.deviceType,
          deviceToken: action.deviceToken,
        },
      };
    }
    case actionTypes.USER_AUTHENTICATED: {
      const { ids, store } = normalize([action.user]);
      return {
        ...mergeStoreIntoState(state, store),
        userId: ids[0],
        shouldAuthenticate: false,
      };
    }
    case actionTypes.USER_LOG_OUT: {
      return {
        ...state,
        userId: null,
        shouldAuthenticate: true,
      };
    }
    case actionTypes.USER_SHOULD_AUTHENTICATE:
      return {
        ...state,
        shouldAuthenticate: true,
      };
    case actionTypes.RETRIEVE_MATCHES_SUCCESS: {
      const { store } = normalize(action.matches);
      return mergeStoreIntoState(state, store);
    }
    case actionTypes.JOIN_RANDOM_MATCH_SUCCESS: {
      const { store } = normalize([action.match]);
      return {
        ...mergeStoreIntoState(state, store),
      };
    }
    case actionTypes.JOIN_MATCH_AGAINST_SUCCESS: {
      const { store } = normalize([action.match]);
      return {
        ...mergeStoreIntoState(state, store),
      };
    }
    case actionTypes.GAME_PICKED_SUCCESS: {
      const { store } = normalize([action.game]);
      return mergeStoreIntoState(state, store);
    }
    case actionTypes.GAME_SCORE_CREATED_SUCCESS: {
      const { store } = normalize([action.game, action.gameScore]);
      return mergeStoreIntoState(state, store);
    }
    default:
      return state;
  }
}
