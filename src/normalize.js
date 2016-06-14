import keyBy from 'lodash/keyBy';

import GAMES from './games';

const PARTICIPANTS_NB = 2;
const GAMES_NB = 3;
const ROUNDS_NB = 3;

const gameTypeByName = keyBy(GAMES, 'name');

const gt = (a, b) => a > b;
const st = (a, b) => a < b;

function getBestScore(best, s1, s2) {
  if (best(s1.score, s2.score)) {
    return s1;
  }
  if (s1.score === s2.score) {
    return {
      score: s1.score,
      users: s1.users.concat(s2.user),
    };
  }
  return s2;
}

const usersMap = {};

export const normalizeUser = user => {
  if (usersMap[user.id]) {
    return usersMap[user.id];
  }
  const normalizedUser = {
    id: user.id,
    raw: user,
    username: user.get('username'),
  };
  usersMap[user.id] = normalizedUser;
  return normalizedUser;
};

const normalizeScore = score => ({
  id: score.id,
  raw: score,
  score: score.get('score'),
  users: [normalizeUser(score.get('user'))],
});

const normalizeGame = game => {
  const gameType = gameTypeByName[game.get('gameName')];
  const scores = game.get('scores').map(normalizeScore);
  const best = gameType.winner === 'GREATEST' ? gt : st;
  const bestScore = scores.reduce(getBestScore.bind(null, best));
  return {
    id: game.id,
    raw: game,
    type: gameType,
    isFinished: scores.length === PARTICIPANTS_NB,
    bestScore,
    scores,
  };
};

const normalizeRound = round => {
  const games = round.get('games').map(normalizeGame);

  const additionalGames = GAMES_NB - games.length;
  for (let i = 0; i < additionalGames; i++) {
    games.push({
      id: `temp${i}`,
      placeholder: true,
      isFinished: false,
    });
  }

  return {
    id: round.id,
    raw: round,
    games,
    isFinished: games.every(game => game.isFinished),
  };
};

export const normalizeMatch = match => {
  const participants = match.get('participants').map(normalizeUser);

  const additionalParticipants = PARTICIPANTS_NB - participants.length;
  for (let i = 0; i < additionalParticipants; i++) {
    participants.push({
      id: `temp${i}`,
      placeholder: true,
      username: `Opponent ${(i + 1).toString()}`,
    });
  }

  const startedBy = normalizeUser(match.get('startedBy'));
  const rounds = match.get('rounds').map(
    normalizeRound.bind(null)
  );

  // STATE

  const isFinished = rounds.every(round => round.isFinished);
  let currentRound;
  let awaitingPlayers;
  if (isFinished) {
    currentRound = null;
    awaitingPlayers = [];
  } else {
    const currentRoundIdx = rounds.findIndex(round => !round.isFinished);
    currentRound = currentRoundIdx === -1 ? null : rounds[currentRoundIdx];

    const firstPlayerIdx = participants.indexOf(startedBy);
    const roundStarterOffset = currentRoundIdx % participants.length;
    const roundStarter = participants[
      // Get the round starter for the nth round.
      (firstPlayerIdx + roundStarterOffset) % participants.length
    ];
    const roundStarterPlayed = currentRound.games.every(game =>
      !game.placeholder && game.scores.some(score => score.user === roundStarter)
    );
    awaitingPlayers = (
      roundStarterPlayed ?
        participants.filter(participant =>
          // Find participants that don't have a score for every game.
          !currentRound.games.every(game =>
            game.scores.some(score => score.user === participant)
          )
        ) :
        [roundStarter]
    );
  }

  // SCORE

  const scoreByUser = new Map(participants.map(p => [p, 0]));
  for (const round of rounds) {
    for (const game of round.games) {
      if (!game.placeholder) {
        for (const user of game.bestScore.users) {
          scoreByUser.set(user, scoreByUser.get(user) + 1);
        }
      }
    }
  }

  let winners = null;
  if (isFinished) {
    winners = scoreByUser.values()
      .reduce(({ users, score }, [user, userScore]) => {
        if (userScore === score) {
          return {
            users: users.concat(user),
            score,
          };
        }
        if (userScore > score) {
          return {
            users: [user],
            score: userScore,
          };
        }
        return { users, score };
      }, { users: [], score: 0 });
  }

  return {
    id: match.id,
    raw: match,
    isFinished,
    startedBy,
    currentRound,
    awaitingPlayers,
    participants,
    rounds,
    winners,
  };
};
