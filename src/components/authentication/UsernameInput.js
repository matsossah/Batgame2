import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outer: {
    height: 100,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#FFD664',
  },
  inner: {
    height: 80,
    width: 130,
    borderRadius: 15,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 5,
    width: 100,
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
  updateUsername(text) {
    this.setState({ username: text });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.outer}>
          <View style={styles.inner}>
            <View style={styles.separator} />
            <Text style={styles.label}>
              Username:
            </Text>
            <View style={styles.separator} />
            <TextInput
              autoCorrect={false}
              style={styles.input}
              autoCapitalize="none"
              placeholder="..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              onChangeText={this.updateUsername}
              value={this.state.username}
            />
            <View style={styles.separator} />
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

export default UsernameInput;
