import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { push } from '../../actions/navigation';
import { gotoNextGame } from '../../actions/application';

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

    this.onRoundPress = this.onRoundPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  onRoundPress() {
    const { round, dispatch } = this.props;
    dispatch(push({
      key: 'round',
      roundId: round.id,
    }));
  }

  onNextPress() {
    const { round, dispatch } = this.props;
    dispatch(gotoNextGame(round.id));
  }

  render() {
    const { game, style, ...otherProps } = this.props;

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
            onPress={this.onRoundPress}
          >
            <Text>Round</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.onNextPress}
          >
            <Text>Next</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

GameOverlay.propTypes = {
  game: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  round: PropTypes.object.isRequired,
  style: PropTypes.any,
};

export default connect()(GameOverlay);
