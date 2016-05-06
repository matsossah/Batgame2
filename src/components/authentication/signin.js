import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

const Parse = require('parse/react-native');
let Button = require('../common/button');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 30,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#2C3D50',
    flex: 70,
    alignSelf: 'stretch',
  },
  separator: {
    flex: 1,
    backgroundColor: '#FFD664',
  },
  form: {
    backgroundColor: '#2C3D50',
    flex: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily: 'chalkduster',
  },
  errorMessage: {
    fontSize: 14,
    color: 'red',
  },
});

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };
  }
  onSignupPress() {
    this.props.navigator.push({ name: 'signup' });
  }
  onSigninPress() {
    Parse.User.logIn(this.state.username, this.state.password, {
      success: () => { this.props.navigator.immediatelyResetRouteStack([{ name: 'home' }]); },
      error: this.errorMessage.bind(this),
    });
  }
  errorMessage() {
    this.setState({
      errorMessage: 'Invalid login, please try again',
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>BATGAME</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.separator} />
          <View style={styles.form}>
            <Text style={styles.label}>Sign In</Text>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ username: text })}
              value={this.state.username}
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
            />
            <Text style={styles.errorMessage} >{this.state.errorMessage}</Text>
            <Button text={'Sign In'} onPress={this.onSigninPress.bind(this)} />
            <Button text={'I need an account'} onPress={this.onSignupPress.bind(this)} />
          </View>
        </View>
      </View>
    );
  }
}


module.exports = Signin;
