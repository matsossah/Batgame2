import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

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
              <Text style={styles.scoreLabel}>Total Difference</Text>
              <Text style={styles.score}>
                {formatDuration(game.myScore.score) + 's'}
              </Text>
            </View>
          :
            game.info.scoreType === 'DATE' ?
              <View style={styles.scoreInfo}>
                <Text style={styles.scoreLabel}>Time</Text>
                <Text style={styles.score}>
                  {formatDuration(game.myScore.score) + 's'}
                </Text>
              </View>
                :
              <View style={styles.scoreInfo}>
                <Text style={styles.scoreLabel}>Score</Text>
                <Text style={styles.score}>
                  {game.myScore.score + ' pts'}
                </Text>
              </View>
          }
          <View style={styles.options}>
            <View style={styles.match}>
              <TouchableHighlight
                onPress={this.onMatchPress}
              >
                <Text style={styles.optionLabel}>Match</Text>
              </TouchableHighlight>
            </View>

            {match.awaitingPlayers.includes(user) &&
              <View style={styles.next}>
                <TouchableHighlight
                  onPress={this.onNextPress}
                >
                  <Text style={styles.optionLabel}>Next</Text>
                </TouchableHighlight>
              </View>
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
