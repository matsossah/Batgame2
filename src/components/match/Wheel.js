import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import sample from 'lodash/sample';
import Parse from 'parse/react-native';
import { connect } from 'react-redux';

import GAMES from '../../games';
import { gameCreatedSuccess } from '../../actions/application';
import { push } from '../../actions/navigation';
import { matchSelector, roundSelector } from '../../selectors';

const Game = Parse.Object.extend('Game');
const Round = Parse.Object.extend('Round');

class Wheel extends Component {
  constructor() {
    super();

    this.pickRandomGame = this.pickRandomGame.bind(this);
  }

  pickRandomGame() {
    const { match, round } = this.props;
    const gameInfo = sample(GAMES);

    // @TODO: move this into a createGame action creator
    // Will have to do this once we have navigation experimental
    const game = new Game({
      gameName: gameInfo.name,
      scores: [],
    });

    const roundObj = new Round({
      id: round.id,
    });

    roundObj.add('games', game);

    roundObj.save()
      .then(() => {
        this.props.dispatch(gameCreatedSuccess(roundObj, game));
        this.props.dispatch(push({
          key: 'game',
          gameId: game.id,
          roundId: round.id,
          matchId: match.id,
        }));
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
  round: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect((state, props) => ({
  match: matchSelector(props.matchId, state),
  round: roundSelector(props.roundId, state),
}))(Wheel);
