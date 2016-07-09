import React, { PropTypes, Component } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C3D50',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  countdown: {
    fontSize: 90,
    fontFamily: 'chalkduster',
  },
});

const numberStyles = StyleSheet.create({
  3: {
    color: '#E74C3C',
  },
  2: {
    color: '#E67E2C',
  },
  1: {
    color: '#4EB479',
  },
});

class GameCountdown extends Component {
  constructor() {
    super();

    this.state = {
      timeRemaining: 3,
      animation: new Animated.Value(1),
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.animate();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onUpdate() {
    const timeRemaining = this.state.timeRemaining - 1;

    if (timeRemaining !== 0) {
      this.setState({ timeRemaining });
      this.animate();
    } else {
      this.props.onEnd();
    }
  }

  animate() {
    this.timeout = setTimeout(this.onUpdate, 1000);
    this.state.animation.setValue(1);
    Animated.timing(this.state.animation, {
      easing: Easing.linear,
      toValue: 0,
      duration: 1000,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1],
            }),
            transform: [
              {
                scale: this.state.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          }}
        >
          <Text style={[styles.countdown, numberStyles[this.state.timeRemaining]]}>
            {this.state.timeRemaining.toString()}
          </Text>
        </Animated.View>
      </View>
    );
  }
}

GameCountdown.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default GameCountdown;
