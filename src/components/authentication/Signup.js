import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';
import Parse from 'parse/react-native';

import Button from '../common/Button';
import FacebookConnect from './FacebookConnect';

import styles from './formStyles';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: '',
    };
    this.onSignupPress = this.onSignupPress.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePasswordConfirmation = this.updatePassword.bind(this);
  }
  onSignupPress() {
    const user = new Parse.User();
    user.set('username', this.state.username);
    user.set('password', this.state.password);

    if (this.state.username.length < 5) {
      this.setState({ errorMessage: 'Your username must be at least 5 characters' });
      return;
    }
    if (this.state.password.length < 8) {
      this.setState({ errorMessage: 'Your password must be at least 8 characters' });
      return;
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({ errorMessage: 'Your passwords do not match, please retry' });
      return;
    }
    user.signUp(null, {
      success: () => {
        this.props.navigator.immediatelyResetRouteStack([{ name: 'home' }]);
        return;
      },
      error: (error) => {
        this.setState({ errorMessage: error.message });
        return;
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
            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
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
          <FacebookConnect onPress={this.onSignupPress} />
        </View>
      </View>
    );
  }
}

Signup.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default Signup;
