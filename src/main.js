import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
const {
 CardStack: NavigationCardStack,
} = NavigationExperimental;

import { init, userAuthenticated } from './actions/application';
import { pop } from './actions/navigation';
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

class Main extends Component {
  constructor(props) {
    super();

    this.onUserAuthenticated = this.onUserAuthenticated.bind(this);
    // this.configureScene = this.configureScene.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.onPopRoute = this.onPopRoute.bind(this);

    props.dispatch(init());
  }

  onUserAuthenticated(user) {
    this.props.dispatch(userAuthenticated(user));
  }

  onPopRoute(action) {
    if (action.type === 'back') {
      this.props.dispatch(pop());
    }
  }

  renderScene({ scene }) {
    const { route } = scene;
    switch (route.key) {
      case 'home':
        return <Home />;
      case 'pick_opponent':
        return <PickOpponent />;
      case 'match':
        return (
          <Match
            matchId={route.matchId}
          />
        );
      case 'wheel':
        return (
          <Wheel
            matchId={route.matchId}
            roundId={route.roundId}
          />
        );
      case 'game':
        return (
          <Game
            matchId={route.matchId}
            roundId={route.roundId}
            gameId={route.gameId}
          />
        );
      default:
        throw new Error(`Unknown route key: ${route.key}`);
    }
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
    return this.renderScene({
      scene: {
        route: this.props.navigationState.routes.slice(-1)[0],
      },
    });
    // return (
    //   <NavigationCardStack
    //     onNavigate={this.onPopRoute}
    //     renderScene={this.renderScene}
    //     navigationState={this.props.navigationState}
    //   />
    // );
  }
}

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  navigationState: PropTypes.object,
  shouldAuthenticate: PropTypes.bool.isRequired,
};

export default connect(state => ({
  user: state.application.userId && userSelector(state.application.userId, state),
  navigationState: state.navigation,
  shouldAuthenticate: state.application.shouldAuthenticate,
}))(Main);
