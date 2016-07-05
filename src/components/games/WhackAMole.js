import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import sample from 'lodash/sample';

import Template from '../common/Template';
import Duration from '../common/Duration';
import WhackAMoleCell from './WhackAMoleCell';
import Countdown from '../common/Countdown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 20,
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
  twoCells: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

class WhackAMole extends Component {
  constructor() {
    super();
    this.state = {
      duration: null,
      running: true,
      started: false,
      countdownStarted: null,
      activeCell: null,
      score: 0,
      round: 0,
    };
    this.onCellPress = this.onCellPress.bind(this);
    this.newMole = this.newMole.bind(this);
    this.newMoleTimeout = setTimeout(this.newMole, 1);
    this.onStartedTimeout = setTimeout(this.onStarted.bind(this), 1);
    this.onEnd = this.onEnd.bind(this);
  }
  componentWillUnmount() {
    clearTimeout(this.newMoleTimeout);
  }
  onStarted() {
    this.setState({
      started: true,
      countdownStarted: Date.now(),
    });
  }
  onEnd() {
    this.props.onEnd({ score: this.state.score });
  }
  onCellPress(cell) {
    if (!this.state.running) {
      return;
    }
    if (this.state.activeCell === cell) {
      this.setState({
        score: this.state.score + 1,
        activeCell: null,
      });
      this.timeout = setTimeout(this.newMole, 500);
    } else {
      this.setState({
        activeCell: null,
        running: false,
        duration: 30000 - (Date.now() - this.state.countdownStarted),
      });
      clearTimeout(this.timeout);
      this.props.onEnd({ score: this.state.score });
    }
  }
  newMole() {
    const moles = ['topLeft', 'topRight', 'middle', 'bottomLeft', 'bottomRight'];
    const mole = sample(moles);
    this.setState({
      activeCell: mole,
      round: this.state.round + 1,
    });
  }
  renderTimer() {
    if (this.state.running) {
      if (this.state.started) {
        return (<Countdown
          duration={30}
          startTime={this.state.countdownStarted}
          onComplete={this.onEnd}
        />);
      }
      return <Duration duration={30000} />;
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
            <View style={styles.twoCells}>
              <WhackAMoleCell
                cell="topLeft"
                isActive={this.state.activeCell === 'topLeft'}
                onPress={this.onCellPress}
              />
              <WhackAMoleCell
                cell="topRight"
                isActive={this.state.activeCell === 'topRight'}
                onPress={this.onCellPress}
              />
            </View>
            <View style={styles.container}>
              <WhackAMoleCell
                cell="middle"
                isActive={this.state.activeCell === 'middle'}
                onPress={this.onCellPress}
              />
            </View>
            <View style={styles.twoCells}>
              <WhackAMoleCell
                cell="bottomLeft"
                isActive={this.state.activeCell === 'bottomLeft'}
                onPress={this.onCellPress}
              />
              <WhackAMoleCell
                cell="bottomRight"
                isActive={this.state.activeCell === 'bottomRight'}
                onPress={this.onCellPress}
              />
            </View>
          </View>
        }
      />
    );
  }
}

WhackAMole.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default WhackAMole;
