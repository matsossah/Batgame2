import actionTypes from '../actionTypes';
import normalize from '../normalize';
import Parse from 'parse/react-native';

const initialState = {
  userId: null,
  shouldAuthenticate: false,
  users: {},
  matches: {},
  rounds: {},
  games: {},
  scores: {},
};

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
    case actionTypes.USER_AUTHENTICATED: {
      const { ids, store } = normalize([action.user]);
      return {
        ...mergeStoreIntoState(state, store),
        userId: ids[0],
        shouldAuthenticate: false,
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
    case actionTypes.GAME_CREATED_SUCCESS: {
      const { store } = normalize([action.game]);
      // Navigation
      return mergeStoreIntoState(state, store);
    }
    case actionTypes.GAME_SCORE_CREATED_SUCCESS: {
      const { store } = normalize([action.game, action.gameScore]);
      console.log(store);
      /// Navigation
      return mergeStoreIntoState(state, store);
    }
    default:
      return state;
  }
}
