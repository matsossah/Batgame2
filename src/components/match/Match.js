import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import sample from 'lodash/sample';

import { userSelector, matchSelector } from '../../selectors';
import { gotoNextGame, popMain } from '../../actions/navigation';
import Template from '../common/Template';
import Round from './Round';

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  topFooter: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  bottomFooter: {
    flex: 1,
    flexDirection: 'row',
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
    backgroundColor: '#FFD664',
    marginBottom: 20,
  },
  backButton: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3D50',
  },
  emoji: {
    fontSize: 50,
    color: '#2C3D50',
  },
  action: {
    fontSize: 18,
    fontFamily: 'chalkduster',
    fontWeight: 'bold',
    color: 'white',
  },
  backBox: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  playBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
  },
  back: {
    fontSize: 50,
    fontFamily: 'chalkduster',
    fontWeight: 'bold',
    color: '#FFD664',
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
    this.onBackPress = this.onBackPress.bind(this);
  }

  onActiveRoundPress() {
    const {
      match,
      dispatch,
    } = this.props;

    dispatch(gotoNextGame(match.id));
  }

  onBackPress() {
    this.props.dispatch(popMain());
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
          <View style={styles.footerContainer}>
            <View style={styles.topFooter}>
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
            </View>
            <View style={styles.bottomFooter}>
              <View style={styles.backBox}>
                <TouchableHighlight
                  onPress={this.onBackPress}
                  underlayColor="transparent"
                >
                  <View style={styles.backButton}>
                    <Text style={styles.back}>{'<'}</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.playBox}>
                <TouchableHighlight>
                  <View style={styles.playButton}>
                    <Text style={styles.action}>PLAY</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.empty} />
            </View>
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
