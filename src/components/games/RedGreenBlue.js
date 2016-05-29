import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Template from '../common/Template';
import Timer from '../common/Timer';
import Duration from '../common/Duration';
import Board from '../common/Board';
import sample from 'lodash/sample';

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

class RedGreenBlue extends Component {
  constructor() {
    super();
    this.state = {
      startTime: Date.now(),
      duration: null,
      running: true,
      score: 0,
      color: sample(colors),
    };
    this.onPressHandlers = {
      red: this.onButtonPress.bind(this, 'red'),
      green: this.onButtonPress.bind(this, 'green'),
      blue: this.onButtonPress.bind(this, 'blue'),
    };
  }
  onButtonPress(color) {
    if (this.state.color === color) {
      const newColor = sample(colors);
      this.setState({
        color: newColor,
        score: this.state.score + 1,
      });
    } else {
      this.setState({
        running: false,
        duration: Date.now() - this.state.startTime,
      });
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
              {this.state.running ?
                <Timer startTime={this.state.startTime} /> :
                <Duration duration={this.state.duration} />
              }
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
  navigator: PropTypes.object.isRequired,
};

export default RedGreenBlue;
