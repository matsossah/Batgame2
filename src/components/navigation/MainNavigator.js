import React, { Component, PropTypes } from 'react';
import { NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
const { CardStack } = NavigationExperimental;

import { popMain } from '../../actions/navigation';

import Home from '../gamestart/Home';
import Match from '../match/Match';

class MainNavigator extends Component {
  constructor() {
    super();

    this.onNavigateBack = this.onNavigateBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  onNavigateBack() {
    this.props.dispatch(popMain());
  }

  renderScene({ scene }) {
    const { route } = scene;
    switch (route.type) {
      case 'home':
        return <Home />;
      case 'match':
        return (
          <Match
            matchId={route.matchId}
          />
        );
      default:
        throw new Error(`Unknown route type: ${route.type}`);
    }
  }

  render() {
    return (
      <CardStack
        onNavigateBack={this.onNavigateBack}
        navigationState={this.props.navigationState}
        renderScene={this.renderScene}
      />
    );
  }
}

MainNavigator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigationState: PropTypes.object,
};

export default connect(state => ({
  navigationState: state.navigation.main,
}))(MainNavigator);
