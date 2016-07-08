import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Template from '../common/Template';
import Duration from '../common/Duration';
import Countdown from '../common/Countdown';
import sample from 'lodash/sample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  emojiBox: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  choice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
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
    fontSize: 30,
    fontFamily: 'chalkduster',
    color: '#FFD664',
    marginRight: 10,
  },
  yes: {
    backgroundColor: '#4EB479',
  },
  no: {
    backgroundColor: '#E74C3C',
  },
  label: {
    fontSize: 30,
    fontFamily: 'chalkduster',
    color: 'white',
  },
  colorBox: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorBorder: {
    height: 100,
    width: 250,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'transparent',
  },
});

const words = ['RED', 'BLUE', 'GREEN', 'YELLOW'];
const colors = ['#E74C3C', '#3498DB', '#4EB479', '#FFD664'];

const colorName = {
  'RED': '#E74C3C',
  'BLUE': '#3498DB',
  'GREEN': '#4EB479',
  'YELLOW': '#FFD664',
};

const colorStyles = StyleSheet.create({
  '#E74C3C': {
    color: '#E74C3C',
  },
  '#3498DB': {
    color: '#3498DB',
  },
  '#4EB479': {
    color: '#4EB479',
  },
  '#FFD664': {
    color: '#FFD664',
  },
});

const borderStyles = StyleSheet.create({
  '#E74C3C': {
    borderColor: '#E74C3C',
  },
  '#3498DB': {
    borderColor: '#3498DB',
  },
  '#4EB479': {
    borderColor: '#4EB479',
  },
  '#FFD664': {
    borderColor: '#FFD664',
  },
});

const backgroundStyles = StyleSheet.create({
  '#E74C3C': {
    backgroundColor: '#E74C3C',
  },
  '#3498DB': {
    backgroundColor: '#3498DB',
  },
  '#4EB479': {
    backgroundColor: '#4EB479',
  },
  '#FFD664': {
    backgroundColor: '#FFD664',
  },
});

class RealColor extends Component {
  constructor() {
    super();
    this.state = {
      duration: null,
      running: true,
      started: true,
      countdownStarted: Date.now(),
      color: sample(colors),
      word: sample(words),
      score: 0,
    };
    this.onYesPress = this.onYesPress.bind(this);
    this.onNoPress = this.onNoPress.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
  }
  onEnd() {
    this.setState({
      running: false,
      duration: 30000 - (Date.now() - this.state.countdownStarted),
    });
    this.props.onEnd({ score: this.state.score });
  }
  onYesPress() {
    if (this.state.color === colorName[this.state.word]) {
      this.setState({
        score: this.state.score + 1,
        color: sample(colors),
        word: sample(words),
      });
    } else {
      this.setState({
        running: false,
        duration: 30000 - (Date.now() - this.state.countdownStarted),
      });
      this.props.onEnd({ score: this.state.score });
    }
  }
  onNoPress() {
    if (this.state.color !== colorName[this.state.word]) {
      this.setState({
        score: this.state.score + 1,
        color: sample(colors),
        word: sample(words),
      });
    } else {
      this.setState({
        running: false,
        duration: 30000 - (Date.now() - this.state.countdownStarted),
      });
      this.props.onEnd({ score: this.state.score });
    }
  }
  renderTimer() {
    if (this.state.running) {
      if (this.state.started) {
        return (<Countdown
          duration={30}
          startTime={this.state.countdownStarted}
          onComplete={this.onEnd}
          textStyle={colorStyles[this.state.color]}
        />);
      }
      return <Duration duration={30000} />;
    }
    return (
      <Duration
        duration={this.state.duration}
        textStyle={colorStyles[this.state.color]}
      />);
  }
  render() {
    return (
      <Template
        header={
          <View style={styles.container}>
            <View style={styles.scoreBox}>
              <Text style={[styles.score, colorStyles[this.state.color]]}>
                {this.state.score}
              </Text>
            </View>
            <View style={styles.timerBox}>
              {this.renderTimer()}
            </View>
          </View>
        }
        separatorStyle={backgroundStyles[this.state.color]}
        footer={
          <View style={styles.container}>
            <View style={[styles.colorBox]}>
              <View style={[styles.colorBorder, borderStyles[this.state.color]]}>
                <Text style={[styles.label, colorStyles[this.state.color]]}>
                  {this.state.word}
                </Text>
              </View>
            </View>
            <View style={styles.options}>
              <TouchableHighlight
                onPress={this.onYesPress}
                underlayColor="transparent"
                style={[styles.yes, styles.choice]}
              >
                <View>
                  <Text style={styles.label}>YES</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.onNoPress}
                underlayColor="transparent"
                style={[styles.no, styles.choice]}
              >
                <View>
                  <Text style={styles.label}>NO</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        }
      />
    );
  }
}

RealColor.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default RealColor;
