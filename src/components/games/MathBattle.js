import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import sample from 'lodash/sample';

import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  equations: {
    height: 300,
    width: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  equationButton: {
    height: 70,
    width: 180,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD664',
  },
  topEquationButton: {
    backgroundColor: '#3498DB',
  },
  equalEquationButton: {
    backgroundColor: '#34485E',
  },
  bottomEquationButton: {
    backgroundColor: '#3498DB',
  },
});

const OPS = {
  eq: (a, b) => a === b,
  gt: (a, b) => a > b,
  lt: (a, b) => a < b,
};
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function equationToString([n1, n2]) {
  // Can't use the multiplication symbol × because the font doesn't support it
  return `${n1} X ${n2}`;
}

class MathBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      topOperands: [sample(NUMBERS), sample(NUMBERS)],
      bottomOperands: [sample(NUMBERS), sample(NUMBERS)],
    };
    this.onGtPress = this.onButtonPress.bind(this, 'gt');
    this.onEqPress = this.onButtonPress.bind(this, 'eq');
    this.onLtPress = this.onButtonPress.bind(this, 'lt');
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
    }
  }
  render() {
    const { topOperands, bottomOperands } = this.state;
    const topResult = topOperands[0] * topOperands[1];
    const bottomResult = bottomOperands[0] * bottomOperands[1];

    return (
      <Template
        header={<Title>{this.state.score} points</Title>}
        footer={
          <View style={styles.container}>
            <View style={styles.equations}>
              <LargeButton
                style={[styles.equationButton, styles.topEquationButton]}
                onPress={this.onGtPress}
                buttonText={equationToString(topOperands)}
                underlayColor={topResult > bottomResult ? '#4EB479' : 'red'}
              />
              <LargeButton
                style={[styles.equationButton, styles.equalEquationButton]}
                buttonText="="
                onPress={this.onEqPress}
                underlayColor={topResult === bottomResult ? '#4EB479' : 'red'}
              />
              <LargeButton
                style={[styles.equationButton, styles.bottomEquationButton]}
                onPress={this.onLtPress}
                buttonText={equationToString(bottomOperands)}
                underlayColor={bottomResult > topResult ? '#4EB479' : 'red'}
              />
            </View>
          </View>
        }
      />
    );
  }
}

MathBattle.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default MathBattle;
