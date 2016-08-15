import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Animated, ListView, Easing, Platform } from 'react-native';
import shuffle from 'lodash/shuffle';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';
import WheelItem from './WheelItem';
import I18n from '../../config/i18n';

import GAMES from 'shared/games';
import { gamePicked } from '../../actions/application';
import { gotoGame } from '../../actions/navigation';
import { matchSelector } from 'shared/selectors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  wheel: {
    flex: 3,
    alignItems: 'stretch',
    overflow: 'visible',
    alignSelf: 'stretch',
    marginTop: 60,
    marginBottom: 60,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  buttonBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinButton: {
    backgroundColor: '#FFD664',
    borderColor: '#FFD664',
    marginBottom: 20,
  },
});

const WHEEL_TIMEOUT = 500;
const ROWS = 5;
const AROUND = Math.floor(ROWS / 2);
const OVERSHOOT = 1;
const LENGTH = 100;

function negativeMod(i, n) {
  return ((i % n) + n) % n;
}

class Wheel extends Component {
  constructor() {
    super();

    this.state = {
      games: null,
      gamesDataSource: null,
      finalOffset: null,
      pickedGame: null,
      wheelItemHeight: null,
      spinStarted: false,
      layoutDone: false,
    };

    this.onSpin = this.onSpin.bind(this);
    this.onWheelLayout = this.onWheelLayout.bind(this);
    this.onListViewMount = this.onListViewMount.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  onWheelLayout(e) {
    // For some reason, on Android, this keeps getting called.
    if (this.state.layoutDone) {
      return;
    }

    const { height } = e.nativeEvent.layout;
    const { match } = this.props;

    // Retrieve all played games
    const playedGames = match.rounds.reduce(
      (res, round) => res.concat(
        round.games
          // Not strictly necessary, but avoids having undefined values in the
          // final result.
          .filter(g => g.gamePicked)
          .map(g => g.gameName)
      )
    , []);
    // Retrieve the first game that hasn't been played yet.
    // We need to shuffle the GAMES list first to make sure the order is
    // random every time.
    const gameInfo = shuffle(GAMES).find(g => !playedGames.includes(g.name));

    const games = shuffle(GAMES);
    const gameOffset = games.indexOf(gameInfo);
    const finalOffset = gameOffset + LENGTH;
    const repeatedGames = [];
    for (let i = 0; i <= finalOffset + AROUND + OVERSHOOT; i++) {
      repeatedGames.push({
        game: games[negativeMod(i - LENGTH, games.length)],
        active: false,
      });
    }

    const ds = new ListView.DataSource({
      rowHasChanged: (prev, next) => prev.active !== next.active,
    });

    this.setState({
      wheelItemHeight: Math.floor(height / ROWS),
      finalOffset,
      pickedGame: gameInfo.name,
      games: repeatedGames,
      gamesDataSource: ds.cloneWithRows(repeatedGames),
      layoutDone: true,
    });
  }

  onSpin() {
    const { gameId, matchId, roundId } = this.props;
    const {
      wheelItemHeight,
      finalOffset,
      pickedGame,
      games,
      gamesDataSource,
    } = this.state;
    const spin = new Animated.Value(0);
    spin.addListener(({ value }) => {
      this.listView.scrollTo({
        y: value,
        animated: false,
      });
    });
    spin.setValue(0);
    Animated.timing(spin, {
      toValue: ((finalOffset - AROUND) * wheelItemHeight),
      easing: Easing.inOut(Easing.quad),
      duration: 3000,
    }).start(() => {
      const newGames = games.slice();
      const activeGameIdx = newGames.length - OVERSHOOT - AROUND - 1;
      newGames[activeGameIdx] = {
        ...newGames[activeGameIdx],
        active: true,
      };
      this.setState({
        gamesDataSource: gamesDataSource.cloneWithRows(newGames),
      });
      setTimeout(() => {
        this.props.dispatch(gamePicked(gameId, pickedGame))
          .then(() => {
            this.props.dispatch(gotoGame(matchId, roundId, gameId));
          });
      }, WHEEL_TIMEOUT);
    });
    this.setState({
      spinStarted: true,
    });
  }

  onListViewMount(el) {
    this.listView = el;
  }

  renderRow(row) {
    const { wheelItemHeight } = this.state;
    return (
      <WheelItem
        height={wheelItemHeight}
        game={row.game}
        active={row.active}
      />
    );
  }

  render() {
    return (
      <Template
        header={
          <Title>{I18n.t('spinWheel')}</Title>
        }
        footer={
          <View style={styles.container}>
            <View
              style={styles.wheel}
              onLayout={this.onWheelLayout}
            >
              {this.state.gamesDataSource &&
                <ListView
                  ref={this.onListViewMount}
                  dataSource={this.state.gamesDataSource}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  renderRow={this.renderRow}
                />
              }
              {(Platform.OS === 'ios') &&
                <LinearGradient
                  colors={['#2C3D50', 'rgba(44, 61, 80, 0)', '#2C3D50']}
                  style={styles.linearGradient}
                />
              }
            </View>
            <View style={styles.buttonBox}>
              {!this.state.spinStarted &&
                <LargeButton
                  style={styles.spinButton}
                  onPress={this.onSpin}
                  buttonText={I18n.t('spin')}
                  underlayColor="#FFD664"
                />
              }
            </View>
          </View>
        }
      />
    );
  }
}

Wheel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  matchId: PropTypes.string.isRequired,
  roundId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect((state, props) => ({
  match: matchSelector(props.matchId, state),
}))(Wheel);
