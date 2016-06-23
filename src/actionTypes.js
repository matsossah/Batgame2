function createActionTypes(types) {
  const actionTypes = {};
  types.forEach(type => {
    actionTypes[type] = type;
  });
  return actionTypes;
}

export default createActionTypes([
  'INIT',
  'USER_AUTHENTICATED',
  'USER_SHOULD_AUTHENTICATE',
  'RETRIEVE_MATCHES_SUCCESS',
  'JOIN_RANDOM_MATCH_SUCCESS',
  'GAME_CREATED_SUCCESS',
  'PICK_OPPONENT',
  'LAUNCH_GAME',
  'PUSH',
  'POP',
  'GAME_SCORE_CREATED_SUCCESS',
]);
