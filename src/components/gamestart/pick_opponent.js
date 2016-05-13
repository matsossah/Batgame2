import React, {
  View,
  StyleSheet,
} from 'react-native';

const Parse = require('parse/react-native');
import Template from '../common/template';
import Title from '../common/title';
import LargeButton from '../common/largeButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
  },
  buttonsView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 6,
  },
  newGame: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'green',
  },
});

class PickOpponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.onFacebookPress = this.onFacebookPress.bind(this);
    this.onRandomPress = this.onRandomPress.bind(this);
    this.onSearchPress = this.onSearchPress.bind(this);
  }
  componentWillMount() {
    Parse.User.currentAsync()
      .then((user) => { this.setState({ user: user }); });
  }
  onFacebookPress() {
  }
  onRandomPress() {
  }
  onSearchPress() {
  }
  render() {
    // let username = this.state.user.get('username');

    // if (!this.state.user) {
    //   return <Text>Loading...</Text>;
    // }

    return (
      <Template
        // pass the title in uppercase
        header={<Title>PICK YOUR VICTIM!</Title>}
        footer={
          <View style={styles.container}>
            <View style={styles.empty} />
            <View style={styles.buttonsView}>
              <LargeButton
                style={styles.newGame}
                buttonText="FACEBOOK FRIENDS"
                onPress={this.onFacebookPress}
                underlayColor="#3498DB"
              />
              <LargeButton
                style={styles.newGame}
                buttonText="RANDOM OPPONENT"
                onPress={this.onRandomPress}
                underlayColor="#E67E2C"
              />
              <LargeButton
                style={styles.newGame}
                buttonText="SEARCH BY USERNAME"
                onPress={this.onSearchPress}
                underlayColor="#583B67"
              />
            </View>
            <View style={styles.empty} />
          </View>
        }
      />
    );
  }
}

PickOpponent.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};

module.exports = PickOpponent;
