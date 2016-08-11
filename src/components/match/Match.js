import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import sample from 'lodash/sample';

import { matchSelector } from '../../selectors';
import { joinMatchAgainst } from '../../actions/application';
import { gotoNextGame, popMain } from '../../actions/navigation';
import Template from '../common/Template';
import Round from './Round';
import I18n from '../../config/i18n';
// import Emoji from 'react-native-emoji';
import Fabric from 'react-native-fabric';
import GameOverlay from './GameOverlay';

const { Answers } = Fabric;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    justifyContent: 'space-around',
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
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  playButton: {
    height: 50,
    width: 120,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD664',
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  backButton: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    paddingLeft: 20,
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
    flexDirection: 'row',
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
  waitEmoji: {
    fontSize: 30,
  },
  playEmoji: {
    fontSize: 50,
  },
  firstEmoji: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  waitingBox: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waitingText: {
    fontSize: 20,
    fontFamily: 'chalkduster',
    color: '#7c7c7c',
  },
  lastEmoji: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  gameOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
// const allEmojis to use with react-native-emoji
// const allEmojis = ['grinning', 'smile', 'joy', 'laughing', 'wink', 'blush', 'yum',
//                    'sunglasses', 'heart_eyes', 'smirk', 'stuck_out_tongue_winking_eye',
//                    'see_no_evil', 'hear_no_evil', 'speak_no_evil', 'raised_hands', 'fire', 'v'
//                   ];

const allEmojis = ['😘', '😜', '😎', '👸', '👻', '💪',
                    '👼', '💃', '👊', '😍',
                     '🙈', '😏'];

class Match extends Component {
  constructor() {
    super();
    this.state = {
      leftEmoji: sample(allEmojis),
      rightEmoji: sample(allEmojis),
      displayGame: null,
    };

    this.onPlayPress = this.onPlayPress.bind(this);
    this.onRematchPress = this.onRematchPress.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.onGamePress = this.onGamePress.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onPlayPress() {
    const {
      match,
      dispatch,
    } = this.props;

    Answers.logCustom('Play Pressed');
    dispatch(gotoNextGame(match.id));
  }

  onRematchPress() {
    const {
      match,
      dispatch,
    } = this.props;

    Answers.logCustom('Rematch Pressed');
    dispatch(joinMatchAgainst(match.rightUser.username));
  }

  onBackPress() {
    Answers.logCustom('Match Back');
    this.props.dispatch(popMain());
  }

  onGamePress(game) {
    this.setState({
      displayGame: game,
    });
  }

  onDismiss() {
    this.setState({
      displayGame: null,
    });
  }

  render() {
    const {
      match,
    } = this.props;

    const { rounds, forfeit } = match;

    const awaitingPlayer = (
      !forfeit &&
      match.awaitingPlayers.includes(match.leftUser)
    );
    return (
      <View style={styles.container}>
        <Template
          header={
            <TouchableHighlight
              onPress={this.onBackPress}
              underlayColor="transparent"
              style={styles.headerContainer}
            >
              <View style={styles.headerContainer}>
                <View style={styles.backBox}>
                  <View style={styles.backButton}>
                    <Text style={styles.back}>{'<'}</Text>
                  </View>
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
            </TouchableHighlight>
          }
          footer={
            <View style={styles.footerContainer}>
              <View style={styles.topFooter}>
                {rounds.map((round, idx) => {
                  const isCurrent = !forfeit && round === match.currentRound;
                  const isActive = isCurrent && awaitingPlayer;

                  return (
                    <Round
                      key={round.id}
                      isCurrent={isCurrent}
                      isActive={isActive}
                      currentUser={match.leftUser}
                      roundIdx={idx}
                      round={round}
                      onGamePress={this.onGamePress}
                    />
                  );
                })}
              </View>
              <View style={styles.bottomFooter}>
                {awaitingPlayer ?
                  <View style={styles.playBox}>
                    <Text style={styles.playEmoji}>👉</Text>
                    <TouchableOpacity
                      onPress={this.onPlayPress}
                      activeOpacity={0.6}
                    >
                      <View style={styles.playButton}>
                        <Text style={styles.action}>{I18n.t('play')}</Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.playEmoji}>👈</Text>
                  </View>
                :
                  match.isFinished || forfeit ?
                    <View style={styles.playBox}>
                      <Text style={styles.playEmoji}>👉</Text>
                      <TouchableOpacity
                        onPress={this.onRematchPress}
                        activeOpacity={0.6}
                      >
                        <View style={styles.playButton}>
                          <Text style={styles.action}>{I18n.t('rematch')}</Text>
                        </View>
                      </TouchableOpacity>
                      <Text style={styles.playEmoji}>👈</Text>
                    </View>
                  :
                    <View style={styles.playBox}>
                      <View style={styles.firstEmoji}>
                        <Text style={styles.waitEmoji}></Text>
                      </View>
                      <View style={styles.waitingBox}>
                        <Text style={styles.waitingText}>{I18n.t('waiting')}</Text>
                      </View>
                      <View style={styles.lastEmoji}>
                        <Text style={styles.waitEmoji}></Text>
                      </View>
                    </View>
                }
              </View>
            </View>
          }
        />
        {this.state.displayGame &&
          <GameOverlay
            style={styles.gameOverlay}
            game={this.state.displayGame}
            match={match}
            onDismiss={this.onDismiss}
          />
        }
      </View>
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
