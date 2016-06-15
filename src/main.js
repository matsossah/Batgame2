import React, { Component, PropTypes } from 'react';
import { Navigator, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { init, userAuthenticated } from './actions/application';
import { userSelector } from './selectors';

import Home from './components/gamestart/Home';
import PickOpponent from './components/gamestart/PickOpponent';
import Authentication from './components/authentication/Authentication';
import FacebookUsername from './components/authentication/FacebookUsername';
import Stoplight from './components/games/Stoplight';
import MathBattle from './components/games/MathBattle';
import NumberGame from './components/games/numbers/NumberGame';
import RedGreenBlue from './components/games/RedGreenBlue';
import PopTheBalloon from './components/games/PopTheBalloon';
import WhackAMole from './components/games/WhackAMole';
import Lucky from './components/games/Lucky';
import RightOn from './components/games/RightOn';
import Identical from './components/games/Identical';

import Match from './components/match/Match';
import Wheel from './components/match/Wheel';
import Game from './components/match/Game';

const ROUTES = {
  home: Home,
  pickOpponent: PickOpponent,
  stoplight: Stoplight,
  mathBattle: MathBattle,
  numbers: NumberGame,
  redGreenBlue: RedGreenBlue,
  popTheBalloon: PopTheBalloon,
  whackAMole: WhackAMole,
  lucky: Lucky,
  rightOn: RightOn,
  identical: Identical,
  match: Match,
  wheel: Wheel,
  game: Game,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Main extends Component {
  constructor(props) {
    super();

    this.onUserAuthenticated = this.onUserAuthenticated.bind(this);
    this.configureScene = this.configureScene.bind(this);
    this.renderScene = this.renderScene.bind(this);

    props.dispatch(init());
  }
  onUserAuthenticated(user) {
    this.props.dispatch(userAuthenticated(user));
  }
  configureScene() {
    return Navigator.SceneConfigs.FloatFromRight;
  }
  renderScene(route, navigator) {
    const RouteComponent = ROUTES[route.name];
    return <RouteComponent route={route} navigator={navigator} />;
  }
  render() {
    if (this.props.shouldAuthenticate) {
      return <Authentication onAuthenticated={this.onUserAuthenticated} />;
    }
    if (this.props.user === null) {
      // This state only exists for a *very* short time while we retrieve
      // the current user from the Parse SDK asynchronously.
      // @TODO: Figure out if it is necessary to display a loading indicator
      return <View />;
    }
    if (!this.props.user.hasUsername) {
      return (
        <FacebookUsername onSuccess={this.onUserAuthenticated} />
      );
    }
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'home' }}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
}

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  shouldAuthenticate: PropTypes.bool.isRequired,
};

export default connect(state => ({
  user: state.userId && userSelector(state.userId, state),
  shouldAuthenticate: state.shouldAuthenticate,
}))(Main);
