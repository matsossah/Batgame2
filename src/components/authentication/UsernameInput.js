import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Parse from 'parse/react-native';

import withUser from '../common/withUser';
import Button from '../common/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  outer: {
    height: 200,
    width: 280,
    borderRadius: 20,
    backgroundColor: '#FFD664',
  },
  inner: {
    height: 160,
    width: 240,
    borderRadius: 15,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  topSeparator: {
    height: 1,
    width: 220,
    backgroundColor: 'white',
    marginTop: 30,
  },
  separator: {
    height: 1,
    width: 220,
    backgroundColor: 'white',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    height: 30,
    marginTop: 5,
    color: 'white',
    fontFamily: 'chalkduster',
    fontSize: 16,
  },
  input: {
    height: 35,
    width: 220,
    alignSelf: 'center',
    fontSize: 14,
    color: 'white',
    fontFamily: 'chalkduster',
  },
  button: {
    backgroundColor: '#4EB479',
    borderColor: 'transparent',
  },
});

class UsernameInput extends Component {
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

    this.props.user.save({
      username: this.state.username,
      hasUsername: true,
    }, {
      success: user => {
        this.props.onSuccess(user);
      },
      error: (user, err) => {
        let message;
        switch (err.code) {
          case Parse.Error.USERNAME_TAKEN:
            message = 'This username is already taken.';
            break;
          default:
            // @TODO: Find out exactly what errors can be thrown by .signUp()
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
      <View style={[styles.container]}>
        <View style={[styles.outer, styles.centered]}>
          <View style={[styles.inner]}>
            <View style={styles.topSeparator} />
            <Text style={styles.label}>
              Username:
            </Text>
            <View style={styles.separator} />
            <TextInput
              autoCorrect={false}
              style={styles.input}
              autoCapitalize="none"
              placeholder="type here"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              onChangeText={this.updateUsername}
              value={this.state.username}
            />
            <View style={styles.separator} />
            <Button
              style={[styles.button, styles.centered]}
              text="GO!"
              onPress={this.onPress}
              disabled={this.state.loading}
            />
          </View>
        </View>
      </View>
    );
  }
}

UsernameInput.propTypes = {
  user: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default withUser(UsernameInput);
