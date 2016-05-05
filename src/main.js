var React = require('react-native');

var {
  Navigator,
  Component,
  StyleSheet
} = React;

var Parse = require('parse/react-native');
var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Home = require('./components/gamestart/home');

var ROUTES = {
  signin: Signin,
  signup: Signup,
  home: Home
};

class Main extends React.Component{
  componentWillMount(){
    Parse.initialize("pL5FJAYsevKtKFs6Amq9S4lXgW5veeycsk2Ubmf1", "cLmkourYpYoUIG5R4PI52jZwfNOVJUWno5afqrZA");
  }
  render(){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signin' }}
        renderScene={this.renderScene}
        configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; }}
      />
    );
  }
  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = Main;
