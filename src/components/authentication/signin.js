import React, {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const Parse = require('parse/react-native');
let Button = require('../common/button');
import Tabs from '../common/tabs';

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
  form: {
    marginBottom: 15,
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
    fontSize: 18,
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
    this.onSignupPress = this.onSignupPress.bind(this);
    this.onSigninPress = this.onSigninPress.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }
  onSignupPress() {
    this.props.navigator.push({ name: 'signup' });
  }
  onSigninPress() {
    Parse.User.logIn(this.state.username, this.state.password, {
      success: () => { this.props.navigator.immediatelyResetRouteStack([{ name: 'home' }]); },
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
      <View style={[styles.container, styles.centered]}>
        <View style={styles.footer}>
          <View style={[styles.formView, styles.centered]}>
            <View style={[styles.centered, styles.form]}>
              <TextInput
                style={[styles.input]}
                placeholder={'Username'}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                onChangeText={this.updateUsername}
                value={this.state.username}
              />
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder={'Password'}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                onChangeText={this.updatePassword}
                value={this.state.password}
              />
              <Text style={styles.errorMessage} >{this.state.errorMessage}</Text>
              <View style={styles.formSubmit}>
                <Button text="GO!" onPress={this.onSigninPress} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Signin.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};


module.exports = Signin;
