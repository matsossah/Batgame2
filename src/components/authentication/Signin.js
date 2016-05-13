import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';
import Parse from 'parse/react-native';

import Button from '../common/Button';
import FacebookConnect from './FacebookConnect';

import styles from './formStyles';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };
    this.onSigninPress = this.onSigninPress.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }
  onSigninPress() {
    Parse.User.logIn(this.state.username, this.state.password, {
      success: () => {
        this.props.navigator.immediatelyResetRouteStack([{ name: 'home' }]);
      },
      error: this.errorMessage,
    });
  }
  errorMessage() {
    this.setState({
      errorMessage: 'Invalid login, please try again',
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
          <Text style={styles.errorMessage}>
            {this.state.errorMessage}
          </Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.formSubmit}>
            <Button text="GO!" onPress={this.onSigninPress} />
          </View>
          <FacebookConnect onPress={this.onSigninPress} />
        </View>
      </View>
    );
  }
}

Signin.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default Signin;
