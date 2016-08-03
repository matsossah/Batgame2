import Parse from 'parse/react-native';

import {
  APP_ID,
  CLIENT_KEY,
  SERVER_URL,
} from '../config.js';
import loginWithFacebook from '../loginWithFacebook';
import actionTypes from '../actionTypes';
import { gotoMatch } from './navigation';

// @FIX: For testing purposes.
// This lets us access Parse from the debugger ui's console.
global.Parse = Parse;

const Game = Parse.Object.extend('Game');
const GameScore = Parse.Object.extend('GameScore');

function tryToLogin(dispatch) {
  loginWithFacebook((err, fbUser) => {
    if (err || fbUser === null) {
      dispatch({
        type: actionTypes.USER_SHOULD_AUTHENTICATE,
      });
    } else {
      dispatch({
        type: actionTypes.USER_AUTHENTICATED,
        user: fbUser,
      });
    }
  });
}

export function init() {
  return dispatch => {
    Parse.initialize(APP_ID, CLIENT_KEY);
    Parse.serverURL = SERVER_URL;

    Parse.User.currentAsync().then(user => {
      if (user === null) {
        tryToLogin(dispatch);
      } else {
        // Check that the session hasn't expired
        Parse.Session.current()
          .then(() => {
            dispatch({
              type: actionTypes.USER_AUTHENTICATED,
              user,
            });
          })
          .catch(err => {
            if (err.code === Parse.Error.INVALID_SESSION_TOKEN) {
              Parse.User.logOut().then(() =>
                tryToLogin(dispatch)
              );
            } else {
              throw err;
            }
          });
      }
    }).catch(err => {
      // @TODO: handle error
      console.error(err);
    });
  };
}

export function userAuthenticated(user) {
  return {
    type: actionTypes.USER_AUTHENTICATED,
    user,
  };
}

export function retrieveMatches() {
  return (dispatch, getState) =>
    new Parse.Query('Match')
      .equalTo('participants', new Parse.User({ id: getState().application.userId }))
      .include('participants')
      .include('rounds')
      .include('rounds.games')
      .include('rounds.games.scores')
      .find()
      .then(matches => {
        dispatch({
          type: actionTypes.RETRIEVE_MATCHES_SUCCESS,
          matches,
        });
      })
      .catch(e => {
        // @TODO: handle error
        console.error(e);
      });
}

export function joinRandomMatch() {
  return dispatch => {
    Parse.Cloud
      .run('joinRandomMatch')
      .then(match => {
        dispatch({
          type: actionTypes.JOIN_RANDOM_MATCH_SUCCESS,
          match,
        });
        dispatch(gotoMatch(match.id));
      })
      .catch(err => {
        // @TODO: correctly handle error
        console.error(err);
      });
  };
}

export function joinMatchAgainst(username) {
  return dispatch => Parse.Cloud
    .run('joinMatchAgainst', { username })
    .then(match => {
      dispatch({
        type: actionTypes.JOIN_MATCH_AGAINST_SUCCESS,
        match,
      });
      dispatch(gotoMatch(match.id));
    });
    // We don't catch the error, we expect it to be caught from the
    // dispatch handler.
}

export function gamePickedSuccess(game) {
  return {
    type: actionTypes.GAME_PICKED_SUCCESS,
    game,
  };
}

export function gamePicked(gameId, gameName) {
  return dispatch => {
    // @TODO: move this into a createGame action creator
    // Will have to do this once we have navigation experimental
    const gameObj = new Game({
      id: gameId,
      gameName,
      gamePicked: true,
    });

    return gameObj.save()
      .then(() => {
        dispatch(gamePickedSuccess(gameObj));
      })
      .catch(e => {
        // @TODO: handle error
        console.error(e);
      });
  };
}

export function createGameScore(gameId, score) {
  return (dispatch, getState) => {
    const game = new Game({ id: gameId });
    const user = new Parse.User({ id: getState().application.userId });
    const gameScore = new GameScore({ score, user });
    game.add('scores', gameScore);
    game.save()
      .then(() => {
        dispatch({
          type: actionTypes.GAME_SCORE_CREATED_SUCCESS,
          game,
          gameScore,
        });
      })
      .catch(err => {
        // @TODO: correctly handle error
        console.error(err);
      });
  };
}
