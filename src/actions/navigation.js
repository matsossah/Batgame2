import actionTypes from '../actionTypes';
import { matchSelector } from '../selectors';

export function popMain() {
  return {
    type: actionTypes.POP_MAIN,
  };
}

export function popModals() {
  return {
    type: actionTypes.POP_MODALS,
  };
}

export function gotoPickOpponent() {
  return {
    type: actionTypes.GOTO_PICK_OPPONENT,
  };
}

export function gotoSearchScreen() {
  return {
    type: actionTypes.GOTO_SEARCH_SCREEN,
  };
}

export function gotoMatch(matchId) {
  return {
    type: actionTypes.GOTO_MATCH,
    matchId,
  };
}

export function gotoWheel(matchId, roundId, gameId) {
  return {
    type: actionTypes.GOTO_WHEEL,
    matchId,
    roundId,
    gameId,
  };
}

export function gotoGame(matchId, roundId, gameId) {
  return {
    type: actionTypes.GOTO_GAME,
    matchId,
    roundId,
    gameId,
  };
}

export function gotoNextGame(matchId) {
  return (dispatch, getState) => {
    const match = matchSelector(matchId, getState());
    const { currentRound: round } = match;
    const { nextGame } = round;

    if (!nextGame.gamePicked) {
      dispatch(gotoWheel(match.id, round.id, nextGame.id));
    } else {
      dispatch(gotoGame(match.id, round.id, nextGame.id));
    }
  };
}
