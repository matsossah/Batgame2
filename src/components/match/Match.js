import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import sample from 'lodash/sample';

import { userSelector, matchSelector } from '../../selectors';
import { gotoNextGame, popMain } from '../../actions/navigation';
import Template from '../common/Template';
import Round from './Round';
import I18n from '../../config/i18n';
// import Emoji from 'react-native-emoji';

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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  participants: {
    flex: 3,
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
    width: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498DB',
    marginBottom: 20,
  },
  backButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34485E',
  },
  profileSeparator: {
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
  emoji: {
    fontSize: 50,
  },
});
// const allEmojis to use with react-native-emoji
// const allEmojis = ['grinning', 'smile', 'joy', 'laughing', 'wink', 'blush', 'yum',
//                    'sunglasses', 'heart_eyes', 'smirk', 'stuck_out_tongue_winking_eye',
//                    'see_no_evil', 'hear_no_evil', 'speak_no_evil', 'raised_hands', 'fire', 'v'
//                   ];

const allEmojis = ['😘', '😜', '😎', '🤗', '🤓', '👻', '💪',
                    '👼', '💃', '👊', '😍',
                     '🙈', '😏'];

class Match extends Component {
  constructor() {
    super();
    this.state = {
      leftEmoji: sample(allEmojis),
      rightEmoji: sample(allEmojis),
    };

    this.onPlayPress = this.onPlayPress.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }

  onPlayPress() {
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
            <View style={styles.participants}>
              <View style={styles.left}>
                <Text style={styles.emoji}>{this.state.leftEmoji}</Text>
                <Text style={styles.username}>{match.leftUser.username}</Text>
                <Text style={styles.username}>{match.scoreByUser[match.leftUser.id]}</Text>
              </View>
              <View style={styles.middle}>
                <Text style={styles.profileSeparator}>-</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.emoji}>{this.state.rightEmoji}</Text>
                <Text style={styles.username}>{match.rightUser.username}</Text>
                <Text style={styles.username}>{match.scoreByUser[match.rightUser.id]}</Text>
              </View>
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
                  />
                );
              })}
            </View>
            <View style={styles.bottomFooter}>
              <View style={styles.playBox}>
                {awaitingPlayer &&
                  <TouchableHighlight onPress={this.onPlayPress}>
                    <View style={styles.playButton}>
                      <Text style={styles.action}>{I18n.t('play')}</Text>
                    </View>
                  </TouchableHighlight>
                }
              </View>
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
