import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

class Round extends Component {
  render() {
    const { round, isCurrent, isActive, roundIdx, currentUser } = this.props;

    return (
      <View>
        <Text>Round {roundIdx.toString()}</Text>
        {isCurrent && <Text>Current</Text>}
        {isActive && <Text>Active</Text>}
        {round.games.map(game =>
          <View key={game.id}>
            {game.type === 'NONE' ?
              <Text>?</Text> :
              <Text>{game.bestScore.users.includes(currentUser) ? 'won' : 'lost'}</Text>
            }
          </View>
        )}
      </View>
    );
  }
}

Round.propTypes = {
  round: PropTypes.object.isRequired,
  roundIdx: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Round;
