import React, { Component, PropTypes } from 'react';
import { Navigator, View, StyleSheet } from 'react-native';
import Parse from 'parse/react-native';

import Home from './components/gamestart/Home';
import PickOpponent from './components/gamestart/PickOpponent';
import Authentication from './components/authentication/Authentication';
import FacebookUsername from './components/authentication/FacebookUsername';
import Stoplight from './components/games/Stoplight';
import MathBattle from './components/games/MathBattle';
import NumberGame from './components/games/numbers/NumberGame';
import loginWithFacebook from './loginWithFacebook';

// @FIX: For testing purposes.
// This lets us access Parse from the debugger ui's console.
global.Parse = Parse;

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Main extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      shouldAuthenticate: false,
    };

    this.onUserAuthenticated = this.onUserAuthenticated.bind(this);
    this.onFacebookUsernameSuccess = this.onFacebookUsernameSuccess.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.renderScene = this.renderScene.bind(this);

    Parse.initialize(APP_ID, CLIENT_KEY);
    Parse.serverURL = SERVER_URL;
    Parse.User.logOut();

    Parse.User.currentAsync().then(user => {
      if (user === null) {
        loginWithFacebook((err, fbUser) => {
          if (err || fbUser === null) {
            this.setState({ shouldAuthenticate: true });
          } else {
            this.setState({ user: fbUser });
          }
        });
      } else {
        this.setState({ user });
      }
    });
  }
  getChildContext() {
    return {
      user: this.state.user,
    };
  }
  onUserAuthenticated(user) {
    this.setState({ user, shouldAuthenticate: false });
  }
  onFacebookUsernameSuccess(user) {
    this.setState({ user });
  }
  configureScene() {
    return Navigator.SceneConfigs.FloatFromRight;
  }
  renderScene(route, navigator) {
    const RouteComponent = ROUTES[route.name];
    return <RouteComponent route={route} navigator={navigator} />;
  }
  render() {
    if (this.state.shouldAuthenticate) {
      return <Authentication onAuthenticated={this.onUserAuthenticated} />;
    }
    if (this.state.user === null) {
      // This state only exists for a *very* short time while we retrieve
      // the current user from the Parse SDK asynchronously.
      // @TODO: Figure out if it is necessary to display a loading indicator
      return <View />;
    }
    if (!this.state.user.get('hasUsername')) {
      return (
        <FacebookUsername onSuccess={this.onFacebookUsernameSuccess} />
      );
    }
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'mathBattle' }}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
}

Main.childContextTypes = {
  user: PropTypes.object,
};

export default Main;
