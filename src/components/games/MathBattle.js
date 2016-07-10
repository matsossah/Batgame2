import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import sample from 'lodash/sample';

import Template from '../common/Template';
import LargeButton from '../common/LargeButton';
import Countdown from '../common/Countdown';
import Duration from '../common/Duration';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  equations: {
    height: 300,
    width: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  equationButton: {
    height: 70,
    width: 200,
    borderRadius: 10,
    borderWidth: 3,
  },
  topEquationButton: {
    backgroundColor: '#3498DB',
    borderColor: '#3498DB',
  },
  equalEquationButton: {
    backgroundColor: '#34485E',
    borderColor: '#34485E',
  },
  bottomEquationButton: {
    backgroundColor: '#3498DB',
    borderColor: '#3498DB',
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

const OPS = {
  eq: (a, b) => a === b,
  gt: (a, b) => a > b,
  lt: (a, b) => a < b,
};
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const COUNTDOWN_DURATION = 20000;

function equationToString([n1, n2]) {
  // Can't use the multiplication symbol × because the font doesn't support it
  return `${n1} X ${n2}`;
}

class MathBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: null,
      running: true,
      started: true,
      countdownStarted: Date.now(),
      score: 0,
      topOperands: [sample(NUMBERS), sample(NUMBERS)],
      bottomOperands: [sample(NUMBERS), sample(NUMBERS)],
    };
    this.onEnd = this.onEnd.bind(this);
    this.onGtPress = this.onButtonPress.bind(this, 'gt');
    this.onEqPress = this.onButtonPress.bind(this, 'eq');
    this.onLtPress = this.onButtonPress.bind(this, 'lt');
  }
  onEnd() {
    this.setState({
      running: false,
      duration: 0,
    });
    this.props.onEnd({ score: this.state.score });
  }
  onButtonPress(opName) {
    const { topOperands, bottomOperands, score } = this.state;
    const topResult = topOperands[0] * topOperands[1];
    const bottomResult = bottomOperands[0] * bottomOperands[1];
    const op = OPS[opName];
    if (op(topResult, bottomResult)) {
      this.setState({
        score: score + 1,
        topOperands: [sample(NUMBERS), sample(NUMBERS)],
        bottomOperands: [sample(NUMBERS), sample(NUMBERS)],
      });
    } else {
      this.setState({
        running: false,
        duration: COUNTDOWN_DURATION - (Date.now() - this.state.countdownStarted),
      });
      this.props.onEnd({ score: this.state.score });
    }
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
    const { topOperands, bottomOperands } = this.state;
    const topResult = topOperands[0] * topOperands[1];
    const bottomResult = bottomOperands[0] * bottomOperands[1];

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
            <View style={styles.equations}>
              <LargeButton
                style={[styles.equationButton, styles.topEquationButton]}
                onPress={this.onGtPress}
                buttonText={equationToString(topOperands)}
                underlayColor="#3498DB"
              />
              <LargeButton
                style={[styles.equationButton, styles.equalEquationButton]}
                buttonText="="
                onPress={this.onEqPress}
                underlayColor="#34485E"
              />
              <LargeButton
                style={[styles.equationButton, styles.bottomEquationButton]}
                onPress={this.onLtPress}
                buttonText={equationToString(bottomOperands)}
                underlayColor="#3498DB"
              />
            </View>
          </View>
        }
      />
    );
  }
}

MathBattle.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default MathBattle;
