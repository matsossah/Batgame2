import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { userSelector, matchSelector } from '../../selectors';
import { gotoNextGame } from '../../actions/application';
import Template from '../common/Template';
import Round from './Round';

class Match extends Component {
  constructor() {
    super();

    this.onActiveRoundPress = this.onActiveRoundPress.bind(this);
  }

  onActiveRoundPress() {
    const {
      match,
      dispatch,
    } = this.props;

    dispatch(gotoNextGame(match.id));
  }

  render() {
    const {
      match,
      user,
    } = this.props;

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
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect((state, props) => ({
  user: userSelector(state.application.userId, state),
  match: matchSelector(props.matchId, state),
}))(Match);
