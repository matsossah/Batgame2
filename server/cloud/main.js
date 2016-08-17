import { differenceWith } from 'lodash';

import i18n from './i18n';
import createNormalize from '../../shared/normalize';
import { matchSelector } from '../../shared/selectors';

const ROUND_NB = 3;
const GAMES_NB = 3;

function createMatchQuery() {
  return new Parse.Query('Match')
    .include('participants')
    .include('rounds')
    .include('rounds.games')
    .include('rounds.games.scores');
}

// @TODO: Create `hasUsername` column automatically

Parse.Cloud.beforeSave(Parse.User, (request, response) => {
  if (request.object.isNew()) {
    const username = request.object.get('username');
    request.object.set('hasUsername', username !== undefined);
  }
  // @TODO: Check whether user is allowed to modify its username
  response.success();
});

const Match = Parse.Object.extend('Match');
const Round = Parse.Object.extend('Round');
const Game = Parse.Object.extend('Game');
const GameScore = Parse.Object.extend('GameScore');
const normalize = createNormalize(Parse);

function createState(user, store) {
  return {
    application: {
      userId: user.id,
      users: {
        ...store[Parse.User.className],
      },
      matches: {
        ...store.Match,
      },
      rounds: {
        ...store.Round,
      },
      games: {
        ...store.Game,
      },
      scores: {
        ...store.GameScore,
      },
    },
  };
}

async function sendNotification(usersIds, getArgsForUser) {
  Parse.Cloud.useMasterKey();
  const installations = await new Parse.Query(Parse.Installation)
    .containedIn('user', usersIds.map(uid => new Parse.User({ id: uid })))
    .find();
  await Promise.all(installations.map(installation => {
    const locale = installation.get('localeIdentifier');
    return Parse.Push.send({
      where: new Parse.Query(Parse.Installation).equalTo('objectId', installation.id),
      data: {
        alert: i18n(locale, ...getArgsForUser(installation.get('user'))),
      },
    }, {
      useMasterKey: true,
    });
  }));
}

async function beforeGameSave(user, gameObj) {
  const game = await new Parse.Query(Game).get(gameObj.id);
  const round = await new Parse.Query(Round)
    .equalTo('games', game)
    .first();
  const match = await createMatchQuery()
    .equalTo('rounds', round)
    .first();

  const storeBefore = normalize([match]);
  const scores = await new Parse.Query(GameScore)
    .include('user')
    .containedIn('objectId', gameObj.get('scores').map(s => s.id))
    .find();
  // Normalize doesn't override duplicates, so we need to normalize
  // gameObj *before* match.
  const storeAfter = normalize([...scores, gameObj, match]);
  const stateBefore = createState(user, storeBefore.store);
  const stateAfter = createState(user, storeAfter.store);
  const matchBefore = matchSelector(match.id, stateBefore);
  const matchAfter = matchSelector(match.id, stateAfter);

  if (!matchBefore.isFinished && matchAfter.isFinished) {
    const otherUsers = matchAfter.participants.filter(u =>
      u.id !== user.id
    );
    await sendNotification(otherUsers.map(u => u.id), otherUser =>
      [
        matchAfter.winners.users.indexOf(otherUser.id) !== -1 ?
          'YOU_WON' : 'YOU_LOST',
        user.get('username'),
      ]
    );
    return;
  }

  const newAwaitingPlayers = differenceWith(
    matchAfter.awaitingPlayers,
    matchBefore.awaitingPlayers,
    (u1, u2) => u1.id === u2.id
  );

  if (newAwaitingPlayers.some(p => p.placeholder)) {
    await match.save({ open: true, closedAt: new Date() });
    return;
  }

  await sendNotification(newAwaitingPlayers.map(u => u.id), () =>
    [
      matchAfter.challenge && matchAfter.currentRound === matchAfter.rounds[0] ?
        'CHALLENGED' : 'YOUR_TURN',
      user.get('username'),
    ]
  );
}

Parse.Cloud.beforeSave('Game', (request, response) => {
  if (request.object.isNew()) {
    response.success();
    return;
  }

  beforeGameSave(request.user, request.object)
    .then(
      () => {
        response.success();
      },
      err => {
        console.error(err.stack);
        response.error();
      }
    );
});

async function createRounds() {
  const rounds = [];
  for (let i = 0; i < ROUND_NB; i++) {
    const games = [];
    for (let j = 0; j < GAMES_NB; j++) {
      games.push(new Game({
        scores: [],
        gameName: null,
        gamePicked: false,
      }));
    }

    await Parse.Object.saveAll(games);
    rounds.push(new Round({
      games,
    }));
  }

  await Parse.Object.saveAll(rounds);
  return rounds;
}

// @TODO: Parse isn't a good match for this kind of usage.
// We need a queue so that we can atomically update our match info.
// @TODO: ACLs on matches so that users can only see their own matches.
async function tryToJoinMatch(user) {
  const query = createMatchQuery();
  query.ascending('createdAt');
  query.equalTo('open', true);
  query.notEqualTo('participants', user);

  let match = await query.first();
  if (!match) {
    match = new Match({
      startedBy: user,
      participants: [user],
      rounds: await createRounds(),
      open: false,
    });

    await match.save();
  } else {
    await match.save({ open: false });

    if (match.get('participants').length > 2) {
      // Another user joined the match in between our two requests.
      // Try again.
      return await tryToJoinMatch(user);
    }

    // This empties the participants list on our local model, so we retrieve
    // them again by running a new query on the match.
    match.addUnique('participants', user);
    await match.save();
    // @WORKAROUND: For some reason Parse does not update our current model
    // in-place, so we override the reference.
    match = await createMatchQuery().get(match.id);
  }

  return match;
}

Parse.Cloud.define('joinRandomMatch', (request, response) => {
  if (!request.user) {
    response.error('User must be authenticated.');
    return;
  }

  tryToJoinMatch(request.user)
    .then(match => {
      response.success(match);
    })
    .catch(err => {
      console.error(err.stack);
      response.error();
    });
});

async function joinMatchAgainst(user, username) {
  const opponent = await new Parse.Query(Parse.User)
    .equalTo('username', username)
    .first();

  if (!opponent) {
    return null;
  }

  const match = new Match({
    startedBy: user,
    participants: [user, opponent],
    rounds: await createRounds(),
    open: false,
    challenge: true,
  });

  await match.save();

  return match;
}

Parse.Cloud.define('joinMatchAgainst', (request, response) => {
  if (!request.user) {
    response.error('User must be authenticated.');
    return;
  }

  if (request.user.username === request.params.username) {
    response.error('Bad request.');
    return;
  }

  joinMatchAgainst(request.user, request.params.username)
    .then(match => {
      if (!match) {
        response.error('Unknown user.');
      } else {
        response.success(match);
      }
    })
    .catch(err => {
      console.error(err.stack);
      response.error();
    });
});

async function addUserToInstallation(user, deviceToken) {
  Parse.Cloud.useMasterKey();
  const query = new Parse.Query(Parse.Installation);
  query.equalTo('deviceToken', deviceToken);

  const installation = await query.first();

  await installation.save({ user });
}

Parse.Cloud.define('addUserToInstallation', (request, response) => {
  const { user } = request;

  if (!user) {
    response.error('User must be authenticated.');
    return;
  }

  const { deviceToken } = request.params;

  if (!deviceToken) {
    response.error('Missing parameter: deviceToken');
    return;
  }

  addUserToInstallation(user, deviceToken)
    .then(
      () => {
        response.success({});
      },
      err => {
        console.error(err.stack);
        response.error('Error while adding user to installation');
      }
    );
});

Parse.Cloud.define('registerInstallation', (request, response) => {
  const { deviceType, deviceToken, localeIdentifier } = request.params;

  if (!deviceType) {
    response.error('Missing parameter: deviceType');
    return;
  }
  if (!deviceToken) {
    response.error('Missing parameter: deviceToken');
    return;
  }
  if (!localeIdentifier) {
    response.error('Missing parameter: localeIdentifier');
    return;
  }

  // Might not be set, will be added later
  const user = request.user;

  Parse.Cloud.useMasterKey();
  const installation = new Parse.Installation({
    deviceToken,
    deviceType,
    localeIdentifier,
    user,
    channels: ['global'],
  });

  installation.save().then(
    () => response.success({}),
    err => {
      console.error(err.stack);
      response.error('Error while saving installation');
    }
  );
});

