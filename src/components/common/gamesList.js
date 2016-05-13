import React, {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const Parse = require('parse/react-native');
// import GameItem from './gameItem';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    height: 20,
    width: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    // this.onNewGamePress = this.onNewGamePress.bind(this);
  }
  componentWillMount() {
    Parse.User.currentAsync()
      .then((user) => { this.setState({ user: user }); });
  }
  render() {
    let username = this.state.user.get('username');

    return (
      <View style={styles.container}>
        <View style={styles.header} />
          {this.props.games.map((game, idx) => {
            if (game.isFinished) {
              return (
                <View>
                  <TouchableHighlight
                    key={idx}
                    onPress={this.onTabToggle}
                  />
                  <Text>
                    {username} VS {game.opponent}
                  </Text>
                </View>
              );
            }
            return (
              <View>
                <TouchableHighlight
                  key={idx}
                  onPress={this.onTabToggle}
                />
                <Text>
                  {username} VS {game.opponent}
                </Text>
              </View>
            );
          })}
      </View>
    );
  }
}

GamesList.propTypes = {
  games: React.PropTypes.arrayOf(React.PropTypes.shape({
    userScore: React.PropTypes.number.isRequired,
    opponent: React.PropTypes.string.isRequired,
    opponentScore: React.PropTypes.number.isRequired,
    isFinished: React.PropTypes.bool.isRequired,

  })).isRequired,
};

module.exports = GamesList;
