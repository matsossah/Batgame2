React = require('react-native');

var {
  View,
  Text,
  TextInput,
  StyleSheet
} = React;

var Parse = require('parse/react-native');
var Button = require('../common/button');

class Signin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>BATGAME</Text>
          <Text style={styles.tagline}>Do you have a higher IQ than your friends?!</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.separator}>
          </View>
          <Text>Sign In</Text>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
          />
          <Text style={styles.errorMessage} >{this.state.errorMessage}</Text>
          <Button text={'Sign In'} onPress={this.onSigninPress.bind(this)} />
          <Button text={'I need an account'} onPress={this.onSignupPress.bind(this)} />
        </View>
      </View>
    );
  }
  onSignupPress() {
    this.props.navigator.push({name: 'signup'});
  }
  onSigninPress() {
    Parse.User.logIn(this.state.username, this.state.password, {
      success: (user) => { this.props.navigator.immediatelyResetRouteStack([{ name: 'home' }]); },
      error: this.errorMessage.bind(this)
    })
  }
  errorMessage() {
    this.setState({
      errorMessage: 'Invalid login, please try again'
    });
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    color: '#FFD664',
  },
  tagline: {
    fontSize: 16,
    color: '#FFD664',
  },
  header: {
    backgroundColor: '#34485E',
    flex: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    flex: 5,
    backgroundColor: '#FFD664',
  },
  footer: {
    backgroundColor: '#2C3D50',
    flex: 70
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
  label: {
    fontSize: 18
  },
  errorMessage: {
    fontSize: 14,
    color: 'red'
  }
});

module.exports = Signin;
