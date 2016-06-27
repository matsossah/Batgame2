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

export function init() {
  return dispatch => {
    Parse.initialize(APP_ID, CLIENT_KEY);
    Parse.serverURL = SERVER_URL;

    Parse.User.currentAsync().then(user => {
      if (user === null) {
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
      } else {
        dispatch({
          type: actionTypes.USER_AUTHENTICATED,
          user,
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
  return (dispatch, getState) => {
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
  };
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

export function gamePickedSuccess(game) {
  return {
    type: actionTypes.GAME_PICKED_SUCCESS,
    game,
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
