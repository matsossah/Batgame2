import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import Stoplight from '../games/Stoplight';
import MathBattle from '../games/MathBattle';
import PopTheBalloon from '../games/PopTheBalloon';
import RedGreenBlue from '../games/RedGreenBlue';
import NumberGame from '../games/numbers/NumberGame';

const gameComponents = {
  STOPLIGHT: Stoplight,
  MATH_BATTLE: MathBattle,
  POP_THE_BALLOON: PopTheBalloon,
  RED_GREEN_BLUE: RedGreenBlue,
  WHACK_A_MOLE: Stoplight,
  NUMBER: NumberGame,
};

class Game extends Component {
  render() {
    const { route: { game, round } } = this.props;

    const GameComponent = gameComponents[game.name];

    return (
      <GameComponent />
    );
  }
}

Game.propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Game;
