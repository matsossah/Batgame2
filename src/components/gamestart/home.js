import React, {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const Parse = require('parse/react-native');
import Template from '../common/template';
import Title from '../common/title';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  random: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'green',
  },
  friend: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'blue',
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentWillMount() {
    Parse.User.currentAsync()
      .then((user) => { this.setState({ user: user }); });
  }
  onNewGamePress() {
    console.log('toto');
  }
  render() {
    // let username = this.state.user.get('username');

    if (!this.state.user) {
      return <Text>Loading...</Text>;
    }

    return (
      <Template
        // pass the title in uppercase
        header={<Title>START A GAME!</Title>}
        footer={
          <TouchableHighlight
            style={styles.random}
            underlayColor="#99d9f4"
            onPress={this.onNewGamePress}
          >
            <Text>New Game</Text>
          </TouchableHighlight>
        }
      />
    );
  }
}

module.exports = Home;
