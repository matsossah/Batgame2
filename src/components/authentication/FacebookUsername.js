import React, { Component, PropTypes } from 'react';
import { View, TextInput, Alert } from 'react-native';
import Parse from 'parse/react-native';
import { connect } from 'react-redux';

import Button from '../common/Button';
import Title from '../common/Title';
import Template from '../common/Template';

import styles from './formStyles';

class FacebookUsername extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
    };

    this.onPress = this.onPress.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }
  onPress() {
    if (this.state.username.length < 5) {
      Alert.alert('Your username must be at least 5 characters.');
      return;
    }
    const user = new Parse.User({ id: this.props.userId });
    user.save({
      username: this.state.username,
      hasUsername: true,
    }, {
      success: () => {
        this.props.onSuccess(user);
      },
      error: (user2, err) => {
        let message;
        switch (err.code) {
          case Parse.Error.USERNAME_TAKEN:
            message = 'This username is already taken.';
            break;
          default:
            // @TODO: Find out exactly what errors can be thrown by .signUp()
            console.error(err);
            message = 'An unknown error occurred. Please try again.';
        }
        Alert.alert(message);
      },
    });
  }
  updateUsername(text) {
    this.setState({ username: text });
  }
  render() {
    return (
      <Template
        header={<Title>Pick a username!</Title>}
        footer={
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
            </View>
            <View style={styles.bottom}>
              <View style={styles.formSubmit}>
                <Button
                  text="GO!"
                  onPress={this.onPress}
                  disabled={this.state.loading}
                />
              </View>
            </View>
          </View>
        }
      />
    );
  }
}

FacebookUsername.propTypes = {
  user: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default connect(state => ({
  userId: state.application.userId,
}))(FacebookUsername);
