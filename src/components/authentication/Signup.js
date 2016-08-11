import React, { Component, PropTypes } from 'react';
import { View, TextInput } from 'react-native';
import Parse from 'parse/react-native';
import I18n from '../../config/i18n';

import Button from '../common/Button';

import styles from './formStyles';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
      passwordConfirmation: '',
    };
    this.onSignupPress = this.onSignupPress.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePasswordConfirmation = this.updatePasswordConfirmation.bind(this);
  }
  onSignupPress() {
    if (this.state.username.length < 3 || this.state.username.length > 9) {
      this.props.onError(I18n.t('username3To9Characters'));
      return;
    }
    if (this.state.password.length < 5) {
      this.props.onError(I18n.t('password5Characters'));
      return;
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      this.props.onError(I18n.t('passwordsNotMatching'));
      return;
    }

    const newUser = new Parse.User();
    newUser.set('username', this.state.username.toLowerCase());
    newUser.set('password', this.state.password);

    this.setState({
      loading: true,
    });
    newUser.signUp(null, {
      success: user => {
        this.setState({
          loading: false,
        });
        this.props.onSignup(user);
      },
      error: (user, err) => {
        this.setState({
          loading: false,
        });
        let message;
        switch (err.code) {
          case Parse.Error.USERNAME_TAKEN:
            message = I18n.t('usernameTaken');
            break;
          default:
            // @TODO: Find out exactly what errors can be thrown by .signUp()
            message = I18n.t('unknownError');
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
            autoCorrect={false}
            style={styles.input}
            autoCapitalize="none"
            placeholder={I18n.t('username')}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={this.state.username}
            onChangeText={this.updateUsername}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder={I18n.t('password')}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={this.state.password}
            onChangeText={this.updatePassword}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder={I18n.t('passwordConfirmation')}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={this.state.passwordConfirmation}
            onChangeText={this.updatePasswordConfirmation}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.formSubmit}>
            <Button
              text={I18n.t('go')}
              onPress={this.onSignupPress}
              disabled={this.state.loading}
            />
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
