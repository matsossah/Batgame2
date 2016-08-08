import React, { Component, PropTypes } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import I18n from '../../config/i18n';

import { userSelector } from '../../selectors';
import { gotoMatch, gotoNextGame } from '../../actions/navigation';
import Fabric from 'react-native-fabric';

const { Answers } = Fabric;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  scoreBox: {
    backgroundColor: '#34485E',
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#FFD664',
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  participants: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  scores: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  participant: {
    flex: 4,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  arrowBox: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  participantScore: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  scoreInfo: {
    flex: 3,
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
    color: '#FFD664',
  },
  userString: {
    fontSize: 14,
    fontFamily: 'chalkduster',
    color: 'white',
    textAlign: 'right',
  },
  scoreString: {
    fontSize: 14,
    fontFamily: 'chalkduster',
    color: 'white',
  },
  arrow: {
    fontSize: 20,
    fontFamily: 'chalkduster',
    color: 'white',
  },
  optionLabel: {
    fontSize: 14,
    fontFamily: 'chalkduster',
    color: '#34485E',
  },
  score: {
    fontSize: 30,
    fontFamily: 'chalkduster',
    color: 'white',
  },
});

function formatDuration(d) {
  // This approach has issues
  // See https://github.com/moment/moment/issues/1048
  return moment.utc(d).format('s.SS');
}

function formatBigDuration(d) {
  // This approach has issues
  // See https://github.com/moment/moment/issues/1048
  return moment.utc(d).format('mm.ss');
}

class GameOverlay extends Component {
  constructor() {
    super();

    this.onMatchPress = this.onMatchPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  onMatchPress() {
    Answers.logCustom('GameOverlay match pressed');
    const { match, dispatch } = this.props;
    dispatch(gotoMatch(match.id));
  }

  onNextPress() {
    Answers.logCustom('GameOverlay next pressed');
    const { match, dispatch } = this.props;
    dispatch(gotoNextGame(match.id));
  }

  renderScoreInfo(title, leftUser, rightUser, scores, length) {
    return (length === 1) ?
      <View style={styles.scoreInfo}>
        <View style={styles.titleBox}>
          <Text style={styles.scoreLabel}>{title}</Text>
        </View>
        <View style={styles.participants}>
          <View style={styles.participant}>
            <Text style={styles.userString}>{I18n.t('you')}</Text>
          </View>
          <View style={styles.arrowBox}>
            <Text style={styles.arrow}>-></Text>
          </View>
          <View style={styles.participantScore}>
            <Text style={styles.scoreString}>{scores[0]}</Text>
          </View>
        </View>
        <View style={styles.scores}>
          <View style={styles.participant}>
            <Text style={styles.userString}>{rightUser}</Text>
          </View>
          <View style={styles.arrowBox}>
            <Text style={styles.arrow}>-></Text>
          </View>
          <View style={styles.participantScore}>
            <Text style={styles.scoreString}>. . .</Text>
          </View>
        </View>
      </View>
     :
      <View style={styles.scoreInfo}>
        <View style={styles.titleBox}>
          <Text style={styles.scoreLabel}>{title}</Text>
        </View>
        <View style={styles.participants}>
          <View style={styles.participant}>
            <Text style={styles.userString}>{I18n.t('you')}</Text>
          </View>
          <View style={styles.arrowBox}>
            <Text style={styles.arrow}>-></Text>
          </View>
          <View style={styles.participantScore}>
            <Text style={styles.scoreString}>{scores[0]}</Text>
          </View>
        </View>
        <View style={styles.scores}>
          <View style={styles.participant}>
            <Text style={styles.userString}>{rightUser}</Text>
          </View>
          <View style={styles.arrowBox}>
            <Text style={styles.arrow}>-></Text>
          </View>
          <View style={styles.participantScore}>
            <Text style={styles.scoreString}>{scores[1]}</Text>
          </View>
        </View>
      </View>;
  }

  renderOptions() {
    const { match, user, onDismiss } = this.props;

    if (onDismiss) {
      return (
        <TouchableWithoutFeedback
          onPress={onDismiss}
        >
          <View
            style={styles.match}
          >
            <Text style={styles.optionLabel}>{I18n.t('back')}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    const options = [];

    options.push(
      <TouchableWithoutFeedback
        key="match"
        onPress={this.onMatchPress}
      >
        <View
          style={styles.match}
        >
          <Text style={styles.optionLabel}>{I18n.t('match')}</Text>
        </View>
      </TouchableWithoutFeedback>
    );

    if (match.awaitingPlayers.includes(user)) {
      options.push(
        <TouchableWithoutFeedback
          key="next"
          onPress={this.onNextPress}
        >
          <View
            style={styles.next}
          >
            <Text style={styles.optionLabel}>{I18n.t('next')}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return options;
  }

  render() {
    const { game, match, style, ...otherProps } = this.props;

    if (game.myScore === undefined) {
      return (
        <View
          style={[styles.overlay, style]}
          {...otherProps}
        />
      );
    }

    return (
      <TouchableWithoutFeedback
        onPress={this.props.onDismiss}
        underlayColor="transparent"
        style={[styles.overlay, style]}
      >
        <View
          style={[styles.overlay, style]}
          {...otherProps}
        >
          <View style={styles.scoreBox}>
            {game.info.name === 'RIGHT_ON' ?
              this.renderScoreInfo(
                I18n.t('totalDifference'),
                match.leftUser.username,
                match.rightUser.username,
                [(formatDuration(game.myScore.score)),
                (formatDuration(game.scores[0].score))],
                game.scores.length
              )
            :
              game.info.scoreType === 'TRIES' ?
                this.renderScoreInfo(
                  I18n.t('tries'),
                  match.leftUser.username,
                  match.rightUser.username,
                  [game.myScore.score,
                  game.scores[0].score],
                  game.scores.length
                )
              :
                game.info.scoreType === 'DATE' ?
                  game.info.name === 'PUZZLE' ?
                    this.renderScoreInfo(
                      I18n.t('time'),
                      match.leftUser.username,
                      match.rightUser.username,
                      [(formatBigDuration(game.myScore.score)),
                      (formatBigDuration(game.scores[0].score))],
                      game.scores.length
                    )
                  :
                    this.renderScoreInfo(
                      I18n.t('time'),
                      match.leftUser.username,
                      match.rightUser.username,
                      [(formatDuration(game.myScore.score)),
                      (formatDuration(game.scores[0].score))],
                      game.scores.length
                    )
                :
                  this.renderScoreInfo(
                    I18n.t('score'),
                    match.leftUser.username,
                    match.rightUser.username,
                    [(game.myScore.score),
                    (game.scores[0].score)],
                    game.scores.length
                  )
            }
            <View style={styles.options}>
              {this.renderOptions()}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

GameOverlay.propTypes = {
  user: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  style: PropTypes.any,
  onDismiss: PropTypes.func,
};

export default connect(state => ({
  user: userSelector(state.application.userId, state),
}))(GameOverlay);
