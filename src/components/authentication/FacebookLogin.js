import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import Parse from 'parse/react-native';

import loginWithFacebook from '../../loginWithFacebook';

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 240,
  },
});

class FacebookLogin extends Component {
  constructor() {
    super();
    this.onFacebookLoginFinished = this.onFacebookLoginFinished.bind(this);
    this.onFacebookLogoutFinished = this.onFacebookLogoutFinished.bind(this);
  }
  onFacebookLoginFinished(error, result) {
    if (error) {
      // There was an error logging the user in.
      this.props.onError('We couldn\'t log you in via Facebook. Please try again.');
    } else if (result.isCancelled) {
      // User has cancelled login.
      // Do nothing.
    } else {
      // All good. Granted permissions are stored in `result`.
      loginWithFacebook((err, user) => {
        if (err) {
          let message;
          switch (err.code) {
            default:
              console.error(err);
              message = 'An unknown error occurred. Please try again.';
              break;
          }
          this.props.onError(message);
        } else {
          this.props.onLogin(user);
        }
      });
    }
  }
  onFacebookLogoutFinished() {
    this.props.onError('User logged out. This should never happen.');
  }
  render() {
    return (
      <LoginButton
        style={styles.button}
        publishPermissions={['publish_actions']}
        onLoginFinished={this.onFacebookLoginFinished}
        onLogoutFinished={this.onLogoutFinished}
      />
    );
  }
}

FacebookLogin.propTypes = {
  onError: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default FacebookLogin;
