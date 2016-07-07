import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import sample from 'lodash/sample';
import Parse from 'parse/react-native';
import { connect } from 'react-redux';
import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';

import GAMES from '../../games';
import { gamePickedSuccess } from '../../actions/application';
import { gotoGame } from '../../actions/navigation';
import { gameSelector } from '../../selectors';

const Game = Parse.Object.extend('Game');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  wheel: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
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

class Wheel extends Component {
  constructor() {
    super();

    this.pickRandomGame = this.pickRandomGame.bind(this);
  }

  pickRandomGame() {
    const { game, matchId, roundId } = this.props;
    const gameInfo = GAMES[9];

    // @TODO: move this into a createGame action creator
    // Will have to do this once we have navigation experimental
    const gameObj = new Game({
      id: game.id,
      gameName: gameInfo.name,
      gamePicked: true,
    });

    gameObj.save()
      .then(() => {
        this.props.dispatch(gamePickedSuccess(gameObj));
        this.props.dispatch(gotoGame(matchId, roundId, game.id));
      })
      .catch(e => {
        // @TODO: handle error
        console.error(e);
      });
  }

  render() {
    return (
      <Template
        header={
          <Title>SPIN THE WHEEL!</Title>
        }
        footer={
          <View style={styles.container}>
            <View style={styles.wheel}>
              <Text>WHEEL</Text>
            </View>
            <View style={styles.buttonBox}>
              <LargeButton
                style={styles.spinButton}
                onPress={this.pickRandomGame}
                buttonText="SPIN"
                underlayColor="#FFD664"
              />
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
  game: PropTypes.object.isRequired,
};

export default connect((state, props) => ({
  game: gameSelector(props.gameId, state),
}))(Wheel);
