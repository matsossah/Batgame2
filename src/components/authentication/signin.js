import React, {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const Parse = require('parse/react-native');
let Button = require('../common/button');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  form: {
  },
  formSubmit: {
    marginTop: 20,
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
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    color: 'white',
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
      <View style={[styles.container, styles.centered]}>
        <View style={[styles.header, styles.centered]}>
          <Text style={styles.title}>BATGAME</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.separator} />
          <View style={[styles.formView, styles.centered]}>
            <View style={styles.centered}>
              <View style={[styles.sections]}>
                <TouchableHighlight onPress={this.onSignupPress.bind(this)}>
                  <Text style={styles.label}>Sign up</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onSignupPress.bind(this)}>
                  <Text style={styles.label}>Login</Text>
                </TouchableHighlight>
              </View>
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
              <View style={styles.formSubmit}>
                <Button text="GO!" onPress={this.onSigninPress.bind(this)}/ >
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


module.exports = Signin;
