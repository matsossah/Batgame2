import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Template from '../common/Template';
import Timer from '../common/Timer';
import Duration from '../common/Duration';
import Board from '../common/Board';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  redButton: {
    backgroundColor: 'red',
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  greenButton: {
    backgroundColor: 'green',
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  blueButton: {
    backgroundColor: 'blue',
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
});

class RedGreenBlue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      running: false,
      score: 0,
      boardButtonColor: 'green',
    };
    this.onRedPress = this.onRedPress.bind(this);
    this.onGreenPress = this.onGreenPress.bind(this);
    this.onBluePress = this.onBluePress.bind(this);
  }
  onRedPress() {
    console.log(this.state.score);
    if (this.state.boardButtonColor === 'red') {
      this.newColor();
      this.setState({
        score: this.state.score + 1,
      });
    } else {
      this.setState({ running: false });
    }
  }
  onGreenPress() {
    console.log(this.state.score);
    if (this.state.boardButtonColor === 'green') {
      this.newColor();
      this.setState({
        score: this.state.score + 1,
      });
    } else {
      this.setState({ running: false });
    }
  }
  onBluePress() {
    console.log(this.state.score);
    if (this.state.boardButtonColor === 'blue') {
      this.newColor();
      this.setState({
        score: this.state.score + 1,
      });
    } else {
      this.setState({ running: false });
    }
  }
  newColor() {
    const colors = ['green', 'red', 'blue'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    this.setState({ boardButtonColor: color, startTime: Date.now(), running: true });
  }
  render() {
    return (
      <Template
        // pass the title in uppercase
        header={
          this.state.running ?
            <Timer startTime={this.state.startTime} /> :
            <Duration duration={this.state.score} />
        }
        footer={
          <View style={styles.container}>
            <View style={styles.board}>
              <Board>
                <View style={styles.boardButton} backgroundColor={this.state.boardButtonColor} />
              </Board>
            </View>
            <View style={styles.options}>
              <TouchableHighlight
                onPress={this.onRedPress}
                underlayColor="gray"
              >
                <View style={styles.redButton} />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.onGreenPress}
                underlayColor="gray"
              >
                <View style={styles.greenButton} />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.onRedPress}
                underlayColor="gray"
              >
                <View style={styles.blueButton} />
              </TouchableHighlight>
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
