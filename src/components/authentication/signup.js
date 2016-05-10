import React, {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

const Parse = require('parse/react-native');
let Button = require('../common/button');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'chalkduster',
    color: '#FFD664',
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'chalkduster',
    color: '#FFD664',
  },
  header: {
    backgroundColor: '#34485E',
    flex: 25,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  footer: {
    backgroundColor: '#2C3D50',
    flex: 75,
    alignSelf: 'stretch',
  },
  separator: {
    flex: 1,
    backgroundColor: '#FFD664',
  },
  formView: {
    backgroundColor: '#2C3D50',
    flex: 29,
  },
  formSubmit: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },
  sections: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'flex-start',
    fontSize: 14,
    color: 'white',
    fontFamily: 'chalkduster',
  },
  label: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'chalkduster',
  },
  errorMessage: {
    fontSize: 14,
    color: '#FFD664',
    fontFamily: 'chalkduster',
  },
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: '',
    };
    this.onSignupPress = this.onSignupPress.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
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
  errorMessage() {
    this.setState({
      errorMessage: 'Invalid login, please try again',
    });
  }
  render() {
    return (
      <View style={[styles.container, styles.centered]}>
        <View style={styles.footer}>
          <View style={[styles.formView]}>
            <View style={[styles.centered]}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Username"
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                value={this.state.updateUsername}
                onChangeText={(text) => this.setState({ username: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                value={this.state.updatePassword}
                onChangeText={(text) => this.setState({ password: text })}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                value={this.state.updatePasswordConfirmation}
                onChangeText={(text) => this.setState({ passwordConfirmation: text })}
                secureTextEntry
              />
              <Text style={styles.errorMessage} >{this.state.errorMessage}</Text>
            </View>
            <View style={styles.formSubmit}>
              <Button text="GO!" onPress={this.onSignupPress} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Signup.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};

module.exports = Signup;
