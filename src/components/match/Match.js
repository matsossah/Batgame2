import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import Template from '../common/Template';
import Round from './Round';
import withUser from '../common/withUser';

import { normalizeUser } from '../../normalize';

class Match extends Component {
  constructor() {
    super();

    this.onActiveRoundPress = this.onActiveRoundPress.bind(this);
  }

  onActiveRoundPress() {
    const {
      route: { match },
      user: userRaw,
    } = this.props;

    const user = normalizeUser(userRaw);

    const nextGame = match.currentRound.games.find(game =>
      game.placeholder || !game.scores.some(score => score.user === user)
    );

    if (nextGame.placeholder) {
      this.props.navigator.push({
        name: 'wheel',
        round: match.currentRound,
      });
    } else {
      this.props.navigator.push({
        name: 'game',
        gameType: nextGame.type,
        round: match.currentRound,
      });
    }
  }

  render() {
    const {
      route: { match },
      user: userRaw,
    } = this.props;

    const user = normalizeUser(userRaw);

    const { participants, rounds } = match;

    let [leftUser, rightUser] = participants;
    // Can't compare references here because `normalizeUser` does not return
    // the same reference for users with the same `id` (yet).
    if (leftUser.id !== user.id) {
      // Ensure that the current user is on the left
      [leftUser, rightUser] = [rightUser, leftUser];
    }

    const awaitingPlayer = match.awaitingPlayers.includes(leftUser);

    return (
      <Template
        header={
          <Text>{leftUser.username} VS {rightUser.username}</Text>
        }
        footer={
          rounds.map((round, idx) => {
            const isCurrent = round === match.currentRound;
            const isActive = isCurrent && awaitingPlayer;
            return (
              <Round
                key={round.id}
                isCurrent={isCurrent}
                isActive={isActive}
                currentUser={leftUser}
                roundIdx={idx}
                round={round}
                onPress={isActive ? this.onActiveRoundPress : null}
              />
            );
          })
        }
      />
    );
  }
}

Match.propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withUser(Match);
