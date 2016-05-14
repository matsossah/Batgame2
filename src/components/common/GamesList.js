import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Parse from 'parse/react-native';

import withUser from './withUser';
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

class GamesList extends Component {
  constructor(props) {
    super(props);
    // this.onNewGamePress = this.onNewGamePress.bind(this);
  }
  render() {
    const username = this.props.user.get('username');

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
  user: PropTypes.object.isRequired,
  games: PropTypes.arrayOf(PropTypes.shape({
    userScore: PropTypes.number.isRequired,
    opponent: PropTypes.string.isRequired,
    opponentScore: PropTypes.number.isRequired,
    isFinished: PropTypes.bool.isRequired,
  })).isRequired,
};

export default withUser(GamesList);
