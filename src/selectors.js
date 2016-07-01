import keyBy from 'lodash/keyBy';
import fromPairs from 'lodash/fromPairs';
import omit from 'lodash/omit';

import GAMES from './games';
const PARTICIPANTS_NB = 2;
const GAMES_NB = 3;
// const ROUNDS_NB = 3;

const gameInfoByName = keyBy(GAMES, 'name');

const gt = (a, b) => b > a;
const st = (a, b) => b < a;

function getBestScore(best, s1, s2) {
  if (best(s1.score, s2.score)) {
    return s2;
  }
  if (s1.score === s2.score) {
    return {
      score: s1.score,
      users: s1.users.concat(s2.users),
    };
  }
  return s1;
}

export const userSelector = (userId, state) => state.application.users[userId];

export const scoreSelector = (scoreId, state) => {
  const score = state.application.scores[scoreId];
  return {
    ...omit(score, 'user'),
    users: [userSelector(score.user, state)],
  };
};

export const gameSelector = (gameId, state) => {
  const game = state.application.games[gameId];
  let info = null;
  let scores = [];
  let isFinished = false;
  let myScore = null;
  let bestScore = null;

  if (game.gamePicked) {
    info = gameInfoByName[game.gameName];
    scores = game.scores.map(scoreId =>
      scoreSelector(scoreId, state)
    );
    myScore = scores.find(score =>
      score.users.some(user => user.id === state.application.userId)
    );
    const best = info.winner === 'GREATEST' ? gt : st;
    if (scores.length > 0) {
      bestScore = scores.reduce(getBestScore.bind(null, best));
    }
    isFinished = scores.length === PARTICIPANTS_NB;
  }

  return {
    ...game,
    scores,
    info,
    isFinished,
    myScore,
    bestScore,
  };
};

export const roundSelector = (roundId, state) => {
  const round = state.application.rounds[roundId];

  const games = round.games.map(gameId =>
    gameSelector(gameId, state)
  );

  const isFinished = games.every(game => game.isFinished);

  let nextGame = null;
  if (!isFinished) {
    nextGame = games.find(game => !game.gamePicked || !game.myScore);
  }

  return {
    ...round,
    games,
    nextGame,
    isFinished,
  };
};

export const matchSelector = (matchId, state) => {
  const match = state.application.matches[matchId];

  const participants = match.participants.map(userId =>
    userSelector(userId, state)
  );

  const additionalParticipants = PARTICIPANTS_NB - participants.length;
  for (let i = 0; i < additionalParticipants; i++) {
    participants.push({
      id: `temp${i}`,
      placeholder: true,
      username: `Opponent ${(i + 1).toString()}`,
    });
  }

  const rounds = match.rounds.map(roundId =>
    roundSelector(roundId, state)
  );

  const startedBy = userSelector(match.startedBy, state);

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
      game.gamePicked && game.scores.some(score => score.users.includes(roundStarter))
    );
    awaitingPlayers = (
      roundStarterPlayed ?
        participants.filter(participant =>
          // Find participants that don't have a score for every game.
          !currentRound.games.every(game =>
            game.scores.some(score => score.users.includes(participant))
          )
        ) :
        [roundStarter]
    );
  }

  // SCORE

  const scoreByUser = fromPairs(participants.map(p => [p.id, 0]), 0);
  for (const round of rounds) {
    for (const game of round.games) {
      if (game.isFinished) {
        for (const user of game.bestScore.users) {
          scoreByUser[user.id] += 1;
        }
      }
    }
  }

  let winners = null;
  if (isFinished) {
    winners = Object.entries(scoreByUser)
      .reduce(({ users, score }, [userId, userScore]) => {
        if (userScore === score) {
          return {
            users: users.concat(userId),
            score,
          };
        }
        if (userScore > score) {
          return {
            users: [userId],
            score: userScore,
          };
        }
        return { users, score };
      }, { users: [], score: 0 });
  }

  let [leftUser, rightUser] = participants;
  // Can't compare references here because `normalizeUser` does not return
  // the same reference for users with the same `id` (yet).
  if (leftUser.id !== state.application.userId) {
    // Ensure that the current user is on the left
    [leftUser, rightUser] = [rightUser, leftUser];
  }

  return {
    ...match,
    scoreByUser,
    leftUser,
    rightUser,
    isFinished,
    awaitingPlayers,
    currentRound,
    participants,
    rounds,
    winners,
    startedBy,
  };
};
