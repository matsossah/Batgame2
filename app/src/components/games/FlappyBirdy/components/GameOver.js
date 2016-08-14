import React, { Component } from 'react';
import { View, Image } from 'react-native';

import { vmin, vmax } from './../services/viewport';

class GameOver extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  componentWillUnMount() {
  }


  render() {
    return (
      <View style={{ position: 'absolute', left: 25 * vmin, top: 30 * vmax }}>
        <Image
          resizeMode="stretch"
          source={require('./../images/flappybird_gameover.png')}
        />
      </View>
    );
  }
}

export default GameOver;
