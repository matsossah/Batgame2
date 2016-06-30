import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { userSelector, matchSelector } from '../../selectors';
import { gotoNextGame } from '../../actions/navigation';
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
    } = this.props;

    const { rounds } = match;

    const awaitingPlayer = match.awaitingPlayers.includes(match.leftUser);
    return (
      <Template
        header={
          <Text>{match.leftUser.username} VS {match.rightUser.username}</Text>
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
                currentUser={match.leftUser}
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
  match: PropTypes.object.isRequired,
};

export default connect((state, props) => ({
  match: matchSelector(props.matchId, state),
}))(Match);
