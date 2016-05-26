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
  redButton: {
    backgroundColor: '#E74C3C',
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  greenButton: {
    backgroundColor: '#4EB479',
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  blueButton: {
    backgroundColor: '#3498DB',
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

class RedGreenBlue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      running: false,
      score: 0,
      boardButtonColor: '#4EB479',
    };
    this.onRedPress = this.onRedPress.bind(this);
    this.onGreenPress = this.onGreenPress.bind(this);
    this.onBluePress = this.onBluePress.bind(this);
  }
  onRedPress() {
    if (this.state.boardButtonColor === '#E74C3C') {
      this.setState({
        score: this.state.score + 1,
      });
      this.newColor();
    } else {
      this.setState({ running: false });
    }
  }
  onGreenPress() {
    if (this.state.boardButtonColor === '#4EB479') {
      this.setState({
        score: this.state.score + 1,
      });
      this.newColor();
    } else {
      this.setState({ running: false });
    }
  }
  onBluePress() {
    if (this.state.boardButtonColor === '#3498DB') {
      this.setState({
        score: this.state.score + 1,
      });
      this.newColor();
    } else {
      this.setState({ running: false });
    }
  }
  newColor() {
    const colors = ['#E74C3C', '#4EB479', '#3498DB'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    this.setState({ boardButtonColor: color, running: true });
  }
  render() {
    return (
      <Template
        // pass the title in uppercase
        header={
          this.state.running ?
            <View style={styles.container}>
              <View style={styles.scoreBox}>
                <Text style={styles.score}>
                  {this.state.score}
                </Text>
              </View>
              <View style={styles.timerBox}>
                <Timer startTime={0} />
              </View>
            </View>
          :
            <View style={styles.container}>
              <View style={styles.scoreBox}>
                <Text style={styles.score}>
                  {this.state.score}
                </Text>
              </View>
              <View style={styles.timerBox}>
                <Duration duration={this.state.score} />
              </View>
            </View>
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
                underlayColor="transparent"
              >
                <View style={styles.redButton} />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.onGreenPress}
                underlayColor="transparent"
              >
                <View style={styles.greenButton} />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.onBluePress}
                underlayColor="transparent"
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
