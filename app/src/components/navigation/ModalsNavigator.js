import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { popModals } from '../../actions/navigation';

import PickOpponent from '../gamestart/PickOpponent';
import SearchScreen from '../gamestart/SearchScreen';
import Wheel from '../match/Wheel';
import Game from '../match/Game';
import VerticalCardStack from './VerticalCardStack';

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
      case 'search_screen':
        return <SearchScreen />;
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
    const currentRoute = this.props.navigationState.routes[this.props.navigationState.index];
    return (
      <VerticalCardStack
        onNavigateBack={this.onNavigateBack}
        // Only enable navigate back for pick opponent
        canNavigateBack={currentRoute.key === 'pick_opponent'}
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
