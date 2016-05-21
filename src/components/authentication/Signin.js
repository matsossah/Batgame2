import React, { Component, PropTypes } from 'react';
import { View, TextInput } from 'react-native';
import Parse from 'parse/react-native';

import Button from '../common/Button';

import styles from './formStyles';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
    };
    this.onSigninPress = this.onSigninPress.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }
  onSigninPress() {
    this.setState({
      loading: true,
    });
    Parse.User.logIn(this.state.username, this.state.password, {
      success: user => {
        this.setState({
          loading: false,
        });
        this.props.onSignin(user);
      },
      error: (user, err) => {
        this.setState({
          loading: false,
        });
        let message;
        switch (err.code) {
          case Parse.Error.OBJECT_NOT_FOUND:
            message = 'Wrong username or password. Please try again.';
            break;
          case Parse.Error.USERNAME_MISSING:
            message = 'Please enter a username.';
            break;
          case Parse.Error.PASSWORD_MISSING:
            message = 'Please enter a password.';
            break;
          default:
            // @TODO: Find out exactly what errors can be thrown by .logIn()
            message = 'An unknown error occurred. Please try again.';
            break;
        }
        this.props.onError(message);
      },
    });
  }
  updateUsername(text) {
    this.setState({ username: text });
  }
  updatePassword(text) {
    this.setState({ password: text });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TextInput
            autoCorrect={false}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Username"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={this.updateUsername}
            value={this.state.username}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={this.updatePassword}
            value={this.state.password}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.formSubmit}>
            <Button
              text="GO!"
              onPress={this.onSigninPress}
              disabled={this.state.loading}
            />
          </View>
        </View>
      </View>
    );
  }
}

Signin.propTypes = {
  onError: PropTypes.func.isRequired,
  onSignin: PropTypes.func.isRequired,
};

export default Signin;
