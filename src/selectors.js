import keyBy from 'lodash/keyBy';
import omit from 'lodash/omit';

import GAMES from './games';
const PARTICIPANTS_NB = 2;
const GAMES_NB = 3;
// const ROUNDS_NB = 3;

const gameInfoByName = keyBy(GAMES, 'name');

const gt = (a, b) => a > b;
const st = (a, b) => a < b;

function getBestScore(best, s1, s2) {
  if (best(s1.score, s2.score)) {
    return s1;
  }
  if (s1.score === s2.score) {
    return {
      score: s1.score,
      users: s1.users.concat(s2.users),
    };
  }
  return s2;
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
  const gameInfo = gameInfoByName[game.gameName];
  const scores = game.scores.map(scoreId =>
    scoreSelector(scoreId, state)
  );
  const myScore = scores.find(score =>
    score.users.some(user => user.id === state.application.userId)
  );
  const best = gameInfo.winner === 'GREATEST' ? gt : st;
  let bestScore = null;
  if (scores.length > 0) {
    bestScore = scores.reduce(getBestScore.bind(null, best));
  }
  return {
    ...game,
    scores,
    info: gameInfo,
    isFinished: scores.length === PARTICIPANTS_NB,
    myScore,
    bestScore,
  };
};

export const roundSelector = (roundId, state) => {
  const round = state.application.rounds[roundId];
  const userId = state.application.userId;

  const games = round.games.map(gameId =>
    gameSelector(gameId, state)
  );

  const additionalGames = GAMES_NB - games.length;
  for (let i = 0; i < additionalGames; i++) {
    games.push({
      id: `temp${i}`,
      placeholder: true,
      isFinished: false,
    });
  }

  const isFinished = games.every(game => game.isFinished);

  let nextGame = null;
  if (!isFinished) {
    nextGame = games.find(game => game.placeholder || !game.myScore);
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

  const scoreByUser = keyBy(participants.map(p => [p.id, 0]), 0);
  for (const round of rounds) {
    for (const game of round.games) {
      if (!game.placeholder && game.bestScore !== null) {
        for (const user of game.bestScore.users) {
          scoreByUser[user.id] += 1;
        }
      }
    }
  }

  let winners = null;
  if (isFinished) {
    winners = Object.values(scoreByUser)
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

  return {
    ...match,
    awaitingPlayers,
    currentRound,
    participants,
    rounds,
    winners,
    startedBy,
  };
};
