import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { init, userAuthenticated } from './actions/application';
import { userSelector } from './selectors';

import Authentication from './components/authentication/Authentication';
import FacebookUsername from './components/authentication/FacebookUsername';
import ModalsNavigator from './components/navigation/ModalsNavigator';

class Main extends Component {
  constructor(props) {
    super();

    this.onUserAuthenticated = this.onUserAuthenticated.bind(this);

    props.dispatch(init());
  }

  onUserAuthenticated(user) {
    this.props.dispatch(userAuthenticated(user));
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
      <ModalsNavigator />
    );
  }
}

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  shouldAuthenticate: PropTypes.bool.isRequired,
};

export default connect(state => ({
  user: state.application.userId && userSelector(state.application.userId, state),
  shouldAuthenticate: state.application.shouldAuthenticate,
}))(Main);
