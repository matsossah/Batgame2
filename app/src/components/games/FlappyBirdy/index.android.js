import React, { Component, AppRegistry } from 'react-native';
import Main from './Main';
import Game from './Game';

class FlappyBirds extends Component {
  render() {
    return (
      <Game />
    );
  }
}


AppRegistry.registerComponent('FlappyBirds', () => Main);
