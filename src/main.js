import React, {
  Navigator,
  StyleSheet,
} from 'react-native';

const Parse = require('parse/react-native');
const Signin = require('./components/authentication/signin');
const Signup = require('./components/authentication/signup');
const Home = require('./components/gamestart/home');
const PickOpponent = require('./components/gamestart/pick_opponent');
const Authentication = require('./components/authentication/authentication');
const Stoplight = require('./components/games/stoplight');

import {
  APP_ID,
  CLIENT_KEY,
  SERVER_URL,
} from './config.js';

const ROUTES = {
  signin: Signin,
  signup: Signup,
  home: Home,
  pick_opponent: PickOpponent,
  authentication: Authentication,
  stoplight: Stoplight,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Main extends React.Component {
  componentWillMount() {
    Parse.initialize(APP_ID, CLIENT_KEY);
    Parse.serverURL = SERVER_URL;
  }
  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'stoplight' }}
        renderScene={this.renderScene}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
}

module.exports = Main;
