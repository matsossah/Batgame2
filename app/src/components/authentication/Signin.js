import React, { Component, PropTypes } from 'react';
import { View, TextInput, Image } from 'react-native';
import Parse from 'parse/react-native';
import I18n from '../../config/i18n';

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
            message = I18n.t('wrongID');
            break;
          case Parse.Error.USERNAME_MISSING:
            message = I18n.t('enterUsername');
            break;
          case Parse.Error.PASSWORD_MISSING:
            message = I18n.t('enterPassword');
            break;
          default:
            // @TODO: Find out exactly what errors can be thrown by .logIn()
            message = I18n.t('unknownError');
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
            placeholder={I18n.t('username')}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={this.updateUsername}
            value={this.state.username}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.refs.SecondInput.focus();
            }}
          />
          <TextInput
            ref="SecondInput"
            secureTextEntry
            style={styles.input}
            placeholder={I18n.t('password')}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={this.updatePassword}
            value={this.state.password}
            onSubmitEditing={this.onSigninPress}
            returnKeyType="done"
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.formSubmit}>
            <Image
              style={styles.image}
              source={require('../../assets/logo.png')}
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
