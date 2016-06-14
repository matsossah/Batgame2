import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import sample from 'lodash/sample';

import GAMES from '../../games';

class Wheel extends Component {
  constructor() {
    super();

    this.pickRandomGame = this.pickRandomGame.bind(this);
  }

  pickRandomGame() {
    const { route: { round } } = this.props;
    const game = sample(GAMES);
    this.props.navigator.push({ name: 'game', game, round });
  }

  render() {
    return (
      <View>
        <Text>Welcome to the wheeeel!</Text>
        <TouchableHighlight
          onPress={this.pickRandomGame}
        >
          <Text>Pick game</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Wheel.propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Wheel;
