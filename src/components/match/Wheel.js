import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import sample from 'lodash/sample';
import Parse from 'parse/react-native';
import { connect } from 'react-redux';

import GAMES from '../../games';
import { gamePickedSuccess } from '../../actions/application';
import { gotoGame } from '../../actions/navigation';
import { gameSelector } from '../../selectors';

const Game = Parse.Object.extend('Game');

class Wheel extends Component {
  constructor() {
    super();

    this.pickRandomGame = this.pickRandomGame.bind(this);
  }

  pickRandomGame() {
    const { game, matchId, roundId } = this.props;
    const gameInfo = sample(GAMES);

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
      <View>
        <Text>Welcome to the wheeeel!</Text>
        <TouchableHighlight
          onPress={this.pickRandomGame}
        >
          <Text>Pick game</Text>
        </TouchableHighlight>
      </View>
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
