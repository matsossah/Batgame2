import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Template from '../common/Template';
import Timer from '../common/Timer';
import Duration from '../common/Duration';
import Board from '../common/Board';
import sample from 'lodash/sample';
import Countdown from '../common/Countdown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  board: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  button: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  boardButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    margin: 0,
  },
  scoreBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
  timerBox: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  score: {
    fontSize: 20,
    fontFamily: 'chalkduster',
    color: '#FFD664',
    marginRight: 10,
  },
});

const buttonColorStyles = StyleSheet.create({
  red: {
    backgroundColor: '#E74C3C',
  },
  green: {
    backgroundColor: '#4EB479',
  },
  blue: {
    backgroundColor: '#3498DB',
  },
});

const colors = ['red', 'green', 'blue'];
const COUNTDOWN_DURATION = 30000;

class RedGreenBlue extends Component {
  constructor() {
    super();
    this.state = {
      duration: null,
      running: true,
      started: false,
      countdownStarted: null,
      score: 0,
      color: sample(colors),
    };
    this.onPressHandlers = {
      red: this.onButtonPress.bind(this, 'red'),
      green: this.onButtonPress.bind(this, 'green'),
      blue: this.onButtonPress.bind(this, 'blue'),
    };
    setTimeout(this.onStarted.bind(this), 3000);
    this.onEnd = this.onEnd.bind(this);
  }
  onStarted() {
    this.setState({
      started: true,
      countdownStarted: Date.now(),
    });
  }
  onEnd() {
    this.setState({
      running: false,
      duration: COUNTDOWN_DURATION - (Date.now() - this.state.countdownStarted),
    });
    this.props.onEnd({ score: this.state.score });
  }
  onButtonPress(color) {
    if (this.state.color === color) {
      const newColor = sample(colors);
      this.setState({
        color: 'black',
        score: this.state.score + 1,
      });
      this.timeout = setTimeout(() => this.setState({ color: newColor }), 100);
    } else {
      this.setState({
        running: false,
        duration: COUNTDOWN_DURATION - (Date.now() - this.state.countdownStarted),
      });
      this.props.onEnd({ score: this.state.score });
    }
  }
  renderButton(color) {
    return (
      <TouchableHighlight
        onPress={this.onPressHandlers[color]}
        underlayColor="transparent"
      >
        <View
          style={[
            styles.button,
            buttonColorStyles[color],
          ]}
        />
      </TouchableHighlight>
    );
  }
  renderTimer() {
    if (this.state.running) {
      if (this.state.started) {
        return (<Countdown
          duration={COUNTDOWN_DURATION / 1000}
          startTime={this.state.countdownStarted}
          onComplete={this.onEnd}
        />);
      }
      return <Duration duration={COUNTDOWN_DURATION} />;
    }
    return <Duration duration={this.state.duration} />;
  }
  render() {
    return (
      <Template
        header={
          <View style={styles.container}>
            <View style={styles.scoreBox}>
              <Text style={styles.score}>
                {this.state.score}
              </Text>
            </View>
            <View style={styles.timerBox}>
              {this.renderTimer()}
            </View>
          </View>
        }
        footer={
          <View style={styles.container}>
            <View style={styles.board}>
              <Board>
                <View
                  style={[
                    styles.boardButton,
                    buttonColorStyles[this.state.color],
                  ]}
                />
              </Board>
            </View>
            <View style={styles.options}>
              {this.renderButton('red')}
              {this.renderButton('green')}
              {this.renderButton('blue')}
            </View>
          </View>
        }
      />
    );
  }
}

RedGreenBlue.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default RedGreenBlue;
