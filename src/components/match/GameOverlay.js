import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { userSelector } from '../../selectors';
import { gotoMatch, gotoNextGame } from '../../actions/navigation';

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

class GameOverlay extends Component {
  constructor() {
    super();

    this.onMatchPress = this.onMatchPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  onMatchPress() {
    const { match, dispatch } = this.props;
    dispatch(gotoMatch(match.id));
  }

  onNextPress() {
    const { match, dispatch } = this.props;
    dispatch(gotoNextGame(match.id));
  }

  render() {
    const { game, match, user, style, ...otherProps } = this.props;

    if (game.myScore === undefined) {
      return (
        <View
          style={[styles.overlay, style]}
          {...otherProps}
        />
      );
    }

    return (
      <View
        style={[styles.overlay, style]}
        {...otherProps}
      >
        <View style={styles.scoreBox}>
          <Text>Score</Text>
          <Text>{game.myScore.score}</Text>
          <TouchableHighlight
            onPress={this.onMatchPress}
          >
            <Text>Match</Text>
          </TouchableHighlight>
          {match.awaitingPlayers.includes(user) &&
            <TouchableHighlight
              onPress={this.onNextPress}
            >
              <Text>Next</Text>
            </TouchableHighlight>
          }
        </View>
      </View>
    );
  }
}

GameOverlay.propTypes = {
  user: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  style: PropTypes.any,
};

export default connect(state => ({
  user: userSelector(state.application.userId, state),
}))(GameOverlay);
