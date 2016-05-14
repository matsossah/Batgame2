import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';
import Parse from 'parse/react-native';

import Button from '../common/Button';

import styles from './formStyles';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
    };
    this.onSignupPress = this.onSignupPress.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePasswordConfirmation = this.updatePassword.bind(this);
  }
  onSignupPress() {
    if (this.state.username.length < 5) {
      this.props.onError('Your username must be at least 5 characters.');
      return;
    }
    if (this.state.password.length < 8) {
      this.props.onError('Your password must be at least 8 characters.');
      return;
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      this.props.onError('Your passwords do not match, please retry.');
      return;
    }

    const newUser = new Parse.User();
    newUser.set('username', this.state.username);
    newUser.set('password', this.state.password);

    newUser.signUp(null, {
      success: user => {
        this.props.onSignup(user);
      },
      error: err => {
        let message;
        switch (err.code) {
          case Parse.Error.USERNAME_TAKEN:
            message = 'This username is already taken.';
            break;
          default:
            // @TODO: Find out exactly what errors can be thrown by .signUp()
            message = 'An unknown error occurred. Please try again.';
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
  updatePasswordConfirmation(text) {
    this.setState({ passwordConfirmation: text });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Username"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={this.state.username}
            onChangeText={this.updateUsername}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={this.state.password}
            onChangeText={this.updatePassword}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={this.state.passwordConfirmation}
            onChangeText={this.updatePasswordConfirmation}
          />
          <Text style={styles.errorMessage}>
            {this.state.errorMessage}
          </Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.formSubmit}>
            <Button text="GO!" onPress={this.onSignupPress} />
          </View>
        </View>
      </View>
    );
  }
}

Signup.propTypes = {
  onError: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
};

export default Signup;
