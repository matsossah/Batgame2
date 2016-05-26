import keyBy from 'lodash/keyBy';
import toPairs from 'lodash/toPairs';
import fromPairs from 'lodash/fromPairs';

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

export const normalizeUser = user => ({
  id: user.id,
  username: user.get('username'),
});

const normalizeScore = (userById, score) => ({
  id: score.id,
  score: score.get('score'),
  users: [userById[score.get('user').id]],
});

const normalizeGame = (userById, game) => {
  const gameType = gameTypeByName[game.get('gameName')];
  const scores = game.get('scores').map(normalizeScore.bind(null, userById));
  const best = gameType.winner === 'GREATEST' ? gt : st;
  const bestScore = scores.reduce(getBestScore.bind(null, best));
  return {
    id: game.id,
    type: gameType,
    finished: scores.length === PARTICIPANTS_NB,
    bestScore,
    scores,
  };
};

const normalizeRound = (userById, round) => {
  const games = round.get('games').map(normalizeGame.bind(null, userById));

  const additionalGames = GAMES_NB - games.length;
  for (let i = 0; i < additionalGames; i++) {
    games.push({
      id: `temp${i}`,
      type: 'NONE',
      finished: false,
    });
  }

  return {
    id: round.id,
    games,
    finished: games.every(game => game.finished),
  };
};

export const normalizeMatch = match => {
  const participants = match.get('participants').map(normalizeUser);

  const additionalParticipants = PARTICIPANTS_NB - participants.length;
  for (let i = 0; i < additionalParticipants; i++) {
    participants.push({
      id: `temp${i}`,
      username: `Opponent ${(i + 1).toString()}`,
      placeholder: true,
    });
  }

  const participantById = keyBy(participants, 'id');

  const startedBy = participantById[match.get('startedBy').id];

  const rounds = match.get('rounds').map(
    normalizeRound.bind(null, participantById)
  );

  const userScoreById = fromPairs(participants.map(p => [p.id, 0]));
  for (const round of rounds) {
    for (const game of round.games) {
      if (game.type !== 'NONE') {
        for (const user of game.bestScore.users) {
          userScoreById[user.id] += 1;
        }
      }
    }
  }

  const isFinished = rounds.every(round => round.finished);

  const currentRoundIdx = rounds.findIndex(round => !round.finished);
  const currentRound = currentRoundIdx === -1 ? null : rounds[currentRoundIdx];

  const firstPlayerIdx = participants.indexOf(startedBy);
  const currentPlayerOffset = currentRoundIdx % participants.length;
  const currentPlayer = participants[
    // Get the next participant
    (firstPlayerIdx + currentPlayerOffset) % participants.length
  ];

  let winners = null;
  if (isFinished) {
    winners = toPairs(userScoreById)
      .reduce(({ users, score }, [userId, userScore]) => {
        if (userScore === score) {
          return {
            users: users.concat(participantById[userId]),
            score,
          };
        }
        if (userScore > score) {
          return {
            users: [participantById[userId]],
            score: userScore,
          };
        }
        return { users, score };
      }, { users: [], score: 0 });
  }

  return {
    id: match.id,
    isFinished,
    startedBy,
    currentPlayer,
    currentRound,
    participants,
    rounds,
    winners,
  };
};
