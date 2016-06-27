function createActionTypes(types) {
  const actionTypes = {};
  types.forEach(type => {
    actionTypes[type] = type;
  });
  return actionTypes;
}

export default createActionTypes([
  'INIT',

  'USER_SHOULD_AUTHENTICATE',
  'USER_AUTHENTICATED',

  'RETRIEVE_MATCHES_SUCCESS',
  'JOIN_RANDOM_MATCH_SUCCESS',
  'GAME_PICKED_SUCCESS',
  'GAME_SCORE_CREATED_SUCCESS',

  'POP_MAIN',
  'POP_MODALS',
  'GOTO_PICK_OPPONENT',
  'GOTO_MATCH',
  'GOTO_WHEEL',
  'GOTO_GAME',
]);
