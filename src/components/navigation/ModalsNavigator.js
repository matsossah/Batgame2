import React, { Component, PropTypes } from 'react';
import { NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
const { CardStack } = NavigationExperimental;

import { popModals } from '../../actions/navigation';

import PickOpponent from '../gamestart/PickOpponent';
import Wheel from '../match/Wheel';
import Game from '../match/Game';

import MainNavigator from './MainNavigator';

class ModalsNavigator extends Component {
  constructor() {
    super();

    this.onNavigateBack = this.onNavigateBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  onNavigateBack() {
    this.props.dispatch(popModals());
  }

  renderScene({ scene }) {
    const { route } = scene;
    switch (route.type) {
      case 'main':
        return (
          <MainNavigator />
        );
      case 'pick_opponent':
        return <PickOpponent />;
      case 'wheel':
        return (
          <Wheel
            matchId={route.matchId}
            roundId={route.roundId}
            gameId={route.gameId}
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
        throw new Error(`Unknown route type: ${route.type}`);
    }
  }

  render() {
    return (
      <CardStack
        direction="vertical"
        onNavigateBack={this.onNavigateBack}
        navigationState={this.props.navigationState}
        renderScene={this.renderScene}
      />
    );
  }
}

ModalsNavigator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigationState: PropTypes.object,
};

export default connect(state => ({
  navigationState: state.navigation.modals,
}))(ModalsNavigator);
