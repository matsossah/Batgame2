import React, { Component, PropTypes } from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';

class Round extends Component {
  render() {
    const {
      round, isCurrent, isActive, roundIdx, currentUser,
      ...otherProps,
    } = this.props;

    return (
      <TouchableWithoutFeedback {...otherProps}>
        <View>
          <Text>Round {(roundIdx + 1).toString()}</Text>
          {isCurrent && <Text>Current</Text>}
          {isActive && <Text>Active</Text>}
          {round.games.map(game =>
            <View key={game.id}>
              {
                !game.gamePicked ?
                (
                  isActive ?
                    <Text>Turn the wheel!</Text> :
                    <Text>Opponent has yet to turn the wheel</Text>
                ) :
                game.isFinished ?
                  <Text>{game.bestScore.users.includes(currentUser) ? 'won' : 'lost'}</Text> :
                game.myScore ?
                  <Text>Waiting for opponent</Text> :
                  <Text>Your turn!</Text>
              }
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
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
