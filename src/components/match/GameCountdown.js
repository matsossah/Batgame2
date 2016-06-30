import React, { PropTypes, Component } from 'react';
import { View, Text } from 'react-native';

class GameCountdown extends Component {
  constructor() {
    super();

    this.state = {
      timeRemaining: 3,
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.timeout = setTimeout(this.onUpdate, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onUpdate() {
    const timeRemaining = this.state.timeRemaining - 1;

    if (timeRemaining !== 0) {
      this.setState({ timeRemaining });
      this.timeout = setTimeout(this.onUpdate, 1000);
    } else {
      this.props.onEnd();
    }
  }

  render() {
    return (
      <View>
        <Text>{this.state.timeRemaining.toString()}</Text>
      </View>
    );
  }
}

GameCountdown.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default GameCountdown;
