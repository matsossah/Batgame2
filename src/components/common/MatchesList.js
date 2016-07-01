import React, { Component, PropTypes } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import partition from 'lodash/partition';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  section: {
    height: 30,
    width: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34485E',
  },
  sectionTitle: {
    color: '#FFD664',
    fontSize: 14,
    fontFamily: 'chalkduster',
  },
  match: {
    height: 70,
    width: 250,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#34485E',
    backgroundColor: '#34485E',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'chalkduster',
    marginLeft: 30,
  },
  victory: {
    color: '#FFD664',
    fontSize: 14,
    fontFamily: 'chalkduster',
    marginLeft: 30,
  },
});

class MatchesList extends Component {
  renderTab(tabName, emptyTabName, array) {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {tabName}
          </Text>
        </View>
        {array.length !== 0 ?
          array.map(match =>
            <TouchableWithoutFeedback
              key={match.id}
              onPress={this.props.onMatchPress.bind(null, match.id)}
            >
              <View style={styles.match}>
                {match.isFinished ?
                  match.winners.users.includes(match.leftUser.id) ?
                    <Text style={styles.victory}>
                        {'YOU BEAT ' + match.rightUser.username + ' !'}
                    </Text>
                  :
                    <Text style={styles.text}>
                      {match.rightUser.username + ' BEAT YOU...'}
                    </Text>
                :
                  <Text style={styles.text}>
                    {match.awaitingPlayers.includes(match.leftUser) ?
                      'Your turn VS ' + match.rightUser.username
                    :
                      'Waiting for ' + match.rightUser.username
                    }
                  </Text>
                }
              </View>
            </TouchableWithoutFeedback>
          )
        :
          <View style={styles.match}>
            <Text style={styles.text}>
            {emptyTabName}
            </Text>
          </View>
        }
      </View>
    );
  }
  render() {
    const [finishedGames, pendingGames] = partition(this.props.matches, { isFinished: true });
    return (
      <View>
        {this.renderTab('PENDING', 'NO PENDING GAMES', pendingGames)}
        {this.renderTab('FINISHED', 'NO FINISHED GAMES', finishedGames)}
      </View>
    );
  }
}

MatchesList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMatchPress: PropTypes.func.isRequired,
};

export default MatchesList;
