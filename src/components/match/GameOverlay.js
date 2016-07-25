import React, { Component, PropTypes } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import I18n from '../../config/i18n';

import { userSelector } from '../../selectors';
import { gotoMatch, gotoNextGame } from '../../actions/navigation';

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  scoreBox: {
    backgroundColor: '#34485E',
    height: 150,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#FFD664',
  },
  scoreInfo: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  match: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#3498DB',
  },
  next: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#4EB479',
  },
  scoreLabel: {
    fontSize: 18,
    fontFamily: 'chalkduster',
    color: 'white',
  },
  optionLabel: {
    fontSize: 14,
    fontFamily: 'chalkduster',
    color: 'white',
  },
  score: {
    fontSize: 30,
    fontFamily: 'chalkduster',
    color: '#FFD664',
  },
});

function formatDuration(d) {
  // This approach has issues
  // See https://github.com/moment/moment/issues/1048
  return moment.utc(d).format('s.SS');
}

class GameOverlay extends Component {
  constructor() {
    super();

    this.onMatchPress = this.onMatchPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  onMatchPress() {
    const { match, dispatch } = this.props;
    dispatch(gotoMatch(match.id));
  }

  onNextPress() {
    const { match, dispatch } = this.props;
    dispatch(gotoNextGame(match.id));
  }

  render() {
    const { game, match, user, style, ...otherProps } = this.props;

    if (game.myScore === undefined) {
      return (
        <View
          style={[styles.overlay, style]}
          {...otherProps}
        />
      );
    }

    return (
      <View
        style={[styles.overlay, style]}
        {...otherProps}
      >
        <View style={styles.scoreBox}>
          {game.info.name === 'RIGHT_ON' ?
            <View style={styles.scoreInfo}>
              <Text style={styles.scoreLabel}>{I18n.t('totalDifference')}</Text>
              <Text style={styles.score}>
                {formatDuration(game.myScore.score) + 's'}
              </Text>
            </View>
          :
            game.info.name === 'MEMORY' ?
              <View style={styles.scoreInfo}>
                <Text style={styles.scoreLabel}>{I18n.t('tries')}</Text>
                <Text style={styles.score}>
                  {game.myScore.score}
                </Text>
              </View>
            :
              game.info.scoreType === 'DATE' ?
                <View style={styles.scoreInfo}>
                  <Text style={styles.scoreLabel}>{I18n.t('time')}</Text>
                  <Text style={styles.score}>
                    {formatDuration(game.myScore.score) + 's'}
                  </Text>
                </View>
                  :
                <View style={styles.scoreInfo}>
                  <Text style={styles.scoreLabel}>{I18n.t('score')}</Text>
                  <Text style={styles.score}>
                    {game.myScore.score + ' pts'}
                  </Text>
                </View>
          }
          <View style={styles.options}>
            <TouchableWithoutFeedback
              onPress={this.onMatchPress}
            >
              <View
                style={styles.match}
              >
                <Text style={styles.optionLabel}>{I18n.t('match')}</Text>
              </View>
            </TouchableWithoutFeedback>

            {match.awaitingPlayers.includes(user) &&

              <TouchableWithoutFeedback
                onPress={this.onNextPress}
              >
                <View
                  style={styles.next}
                >
                  <Text style={styles.optionLabel}>{I18n.t('next')}</Text>
                </View>
              </TouchableWithoutFeedback>
            }
          </View>
        </View>
      </View>
    );
  }
}

GameOverlay.propTypes = {
  user: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  style: PropTypes.any,
};

export default connect(state => ({
  user: userSelector(state.application.userId, state),
}))(GameOverlay);
