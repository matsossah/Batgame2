import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import Template from '../common/Template';
import Round from './Round';
import withUser from '../common/withUser';

import { normalizeMatch, normalizeUser } from '../../normalize';

class Match extends Component {
  render() {
    const {
      route: {
        match: matchRaw,
      },
      user: userRaw,
    } = this.props;

    const match = normalizeMatch(matchRaw);
    const user = normalizeUser(userRaw);

    const { participants, rounds } = match;

    let [leftUser, rightUser] = participants;
    // Can't compare references here because `normalizeUser` does not return
    // the same reference for users with the same `id` (yet).
    if (leftUser.id !== user.id) {
      // Ensure that the current user is on the left
      [leftUser, rightUser] = [rightUser, leftUser];
    }

    const isCurrentPlayer = leftUser === match.currentPlayer;

    return (
      <Template
        header={
          <Text>{leftUser.username} VS {rightUser.username}</Text>
        }
        footer={
          rounds.map((round, idx) =>
            <Round
              key={round.id}
              isCurrent={round === match.currentRound}
              isActive={
                isCurrentPlayer && round === match.currentRound
              }
              currentUser={leftUser}
              roundIdx={idx}
              round={round}
            />
          )
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
