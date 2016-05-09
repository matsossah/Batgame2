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

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: '',
    };
  }
  onSignupPress() {
    const user = new Parse.User();
    user.set('username', this.state.username);
    user.set('password', this.state.password);

    if (this.state.username.length < 5) {
      return this.setState({ errorMessage: 'Your username must be at least 5 characters' });
    }
    if (this.state.password.length < 8) {
      return this.setState({ errorMessage: 'Your password must be at least 8 characters' });
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      return this.setState({ errorMessage: 'Your passwords do not match, please retry' });
    }
    user.signUp(null, {
      success: () => {
        this.props.navigator.immediatelyResetRouteStack([{ name: 'home' }]);
      },
      error: (error) => {
        this.setState({ errorMessage: error.message });
      },
    });
  }
  render() {
    return (
      <View style={[styles.container, styles.centered]}>
        <View style={styles.footer}>
          <View style={[styles.formView, styles.centered]}>
            <View style={[styles.centered, styles.form]}>
              <TextInput
                style={styles.input}
                placeholder={'Username'}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text })}
              />
              <TextInput
                style={styles.input}
                placeholder={'Password'}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder={'Confirm Password'}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                value={this.state.passwordConfirmation}
                onChangeText={(text) => this.setState({ passwordConfirmation: text })}
                secureTextEntry
              />
              <Text style={styles.errorMessage} >{this.state.errorMessage}</Text>
              <View style={styles.formSubmit}>
                <Button text="GO!" onPress={this.onSignupPress.bind(this)} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = Signup;
