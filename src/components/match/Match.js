import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import sample from 'lodash/sample';

import { userSelector, matchSelector } from '../../selectors';
import { gotoNextGame } from '../../actions/navigation';
import Template from '../common/Template';
import Round from './Round';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  left: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  right: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  playButton: {
    height: 50,
    width: 90,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4EB479',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 50,
    color: '#2C3D50',
  },
  action: {
    fontSize: 14,
    fontFamily: 'chalkduster',
    color: 'white',
  },
  username: {
    fontSize: 16,
    fontFamily: 'chalkduster',
    color: '#FFD664',
  },
});

const allEmojis = ['🤑', '😎', '💪', '😋', '😜', '😘', '👏',
                    '😅', '🤗', '😙', '😚', '😝', '😛', '🤓', '😏'];

class Match extends Component {
  constructor() {
    super();

    this.onActiveRoundPress = this.onActiveRoundPress.bind(this);
  }

  onActiveRoundPress() {
    const {
      match,
      dispatch,
    } = this.props;

    dispatch(gotoNextGame(match.id));
  }

  render() {
    const {
      match,
    } = this.props;

    const { rounds } = match;

    const awaitingPlayer = match.awaitingPlayers.includes(match.leftUser);
    return (
      <Template
        header={
          <View style={styles.headerContainer}>
            <View style={styles.left}>
              <Text style={styles.emoji}>{sample(allEmojis)}</Text>
              <Text style={styles.username}>{match.leftUser.username}</Text>
              <Text style={styles.username}>{match.scoreByUser[match.leftUser.id]}</Text>
            </View>
            <View style={styles.middle}>
              <Text style={styles.emoji}>-</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.emoji}>{sample(allEmojis)}</Text>
              <Text style={styles.username}>{match.rightUser.username}</Text>
              <Text style={styles.username}>{match.scoreByUser[match.rightUser.id]}</Text>
            </View>
          </View>
        }
        footer={
          <View style={styles.container}>
            {rounds.map((round, idx) => {
              const isCurrent = round === match.currentRound;
              const isActive = isCurrent && awaitingPlayer;
              return (
                <Round
                  key={round.id}
                  isCurrent={isCurrent}
                  isActive={isActive}
                  currentUser={match.leftUser}
                  roundIdx={idx}
                  round={round}
                  onPress={isActive ? this.onActiveRoundPress : null}
                />
              );
            })}
            <TouchableHighlight>
              <View style={styles.playButton}>
                <Text style={styles.action}>PLAY</Text>
              </View>
            </TouchableHighlight>
          </View>
        }
      />
    );
  }
}

Match.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect((state, props) => ({
  match: matchSelector(props.matchId, state),
}))(Match);
