import React, { Component } from 'react';
import { Navigator, StyleSheet } from 'react-native';
import Parse from 'parse/react-native';

import Home from './components/gamestart/Home';
import PickOpponent from './components/gamestart/PickOpponent';
import Authentication from './components/authentication/Authentication';
import Stoplight from './components/games/Stoplight';
import MathBattle from './components/games/MathBattle';
import NumberGame from './components/games/numbers/NumberGame';
import RedGreenBlue from './components/games/RedGreenBlue';
import PopTheBalloon from './components/games/PopTheBalloon';

import {
  APP_ID,
  CLIENT_KEY,
  SERVER_URL,
} from './config.js';

const ROUTES = {
  authentication: Authentication,
  home: Home,
  pickOpponent: PickOpponent,
  stoplight: Stoplight,
  mathBattle: MathBattle,
  numbers: NumberGame,
  redGreenBlue: RedGreenBlue,
  popTheBalloon: PopTheBalloon,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Main extends Component {
  componentWillMount() {
    Parse.initialize(APP_ID, CLIENT_KEY);
    Parse.serverURL = SERVER_URL;
  }
  configureScene() {
    return Navigator.SceneConfigs.FloatFromRight;
  }
  renderScene(route, navigator) {
    const RouteComponent = ROUTES[route.name];
    return <RouteComponent route={route} navigator={navigator} />;
  }
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'popTheBalloon' }}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
}

export default Main;
