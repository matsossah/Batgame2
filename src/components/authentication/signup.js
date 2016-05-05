var React = require('react-native');

var {
  Text,
  View,
  TextInput,
  StyleSheet
} = React;

var Parse = require('parse/react-native');
var Button = require('../common/button');

class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign up</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry={true}
        />

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          value={this.state.passwordConfirmation}
          onChangeText={(text) => this.setState({passwordConfirmation: text})}
          secureTextEntry={true}
        />
        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        <Button text={'Signup'} onPress={this.onSignupPress.bind(this)} />
        <Button text={'I have an account'} onPress={this.onLoginPress.bind(this)} />
      </View>
    );
  }
  onSignupPress() {
    if ( this.state.username.length < 5 ) {
      return this.setState({errorMessage: 'Your username must be at least 5 characters'})
    };
    if ( this.state.password.length < 8 ){
      return this.setState({errorMessage: 'Your password must be at least 8 characters'})
    }
    if ( this.state.password !== this.state.passwordConfirmation ) {
      return this.setState({errorMessage: 'Your passwords do not match, please retry'})
    };
    var user = new Parse.User();
    user.set("username", this.state.username);
    user.set("password", this.state.password);

    user.signUp(null, {
      success: (user) => {
        this.props.navigator.immediatelyResetRouteStack([{ name: 'home' }]);
      },
      error: (user, error) => {
        this.setState({errorMessage: error.message});
      }
    });
  }
  onLoginPress() {
    this.props.navigator.pop();
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  label: {
    fontSize: 18
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
    errorMessage: {
    fontSize: 14,
    color: 'red'
  }
});

module.exports = Signup;
