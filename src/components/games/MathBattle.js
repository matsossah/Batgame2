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
  topEquationButton: {
    height: 70,
    width: 180,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: '#3498DB',
    borderColor: '#FFD664',
  },
  equalEquationButton: {
    height: 70,
    width: 180,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: '#34485E',
    borderColor: '#FFD664',
  },
  bottomEquationButton: {
    height: 70,
    width: 180,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: '#3498DB',
    borderColor: '#FFD664',
  },
});

class MathBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topEquation: '',
      bottomEquation: '',
      biggerEquation: '',
      score: 0,
      ...this.newEquations(),
    };
    this.onTopPress = this.onTopPress.bind(this);
    this.onBottomPress = this.onBottomPress.bind(this);
    this.onEqualPress = this.onEqualPress.bind(this);
  }
  onTopPress() {
    if ((this.state.topEquation[0] * this.state.topEquation[1]) >
        (this.state.bottomEquation[0] * this.state.bottomEquation[1])) {
      this.setState({
        score: this.state.score + 1,
        ...this.newEquations(),
      });
    }
  }
  onEqualPress() {
    if ((this.state.topEquation[0] * this.state.topEquation[1]) ===
        (this.state.bottomEquation[0] * this.state.bottomEquation[1])) {
      this.setState({
        score: this.state.score + 1,
        ...this.newEquations(),
      });
    }
  }
  onBottomPress() {
    if ((this.state.topEquation[0] * this.state.topEquation[1]) <
        (this.state.bottomEquation[0] * this.state.bottomEquation[1])) {
      this.setState({
        score: this.state.score + 1,
        ...this.newEquations(),
      });
    }
  }
  newEquations() {
    const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const top = [sample(NUMBERS), sample(NUMBERS)];
    const bottom = [sample(NUMBERS), sample(NUMBERS)];
    return { topEquation: top, bottomEquation: bottom };
  }
  render() {
    const { topEquation, bottomEquation } = this.state;
    const topResult = topEquation[0] * topEquation[1];
    const bottomResult = bottomEquation[0] * bottomEquation[1];

    return (
      <Template
        // pass the title in uppercase if needed
        header={<Title>{this.state.score} points</Title>}
        footer={
          <View style={styles.container}>
            <View style={styles.equations}>
              <LargeButton
                style={styles.topEquationButton}
                onPress={this.onTopPress}
                buttonText={topEquation[0].toString() + ' X ' + topEquation[1].toString()}
                underlayColor={topResult > bottomResult ? '#4EB479' : 'red'}
              />
              <LargeButton
                style={styles.equalEquationButton}
                buttonText="="
                onPress={this.onEqualPress}
                underlayColor={topResult === bottomResult ? '#4EB479' : 'red'}
              />
              <LargeButton
                style={styles.bottomEquationButton}
                onPress={this.onBottomPress}
                buttonText={bottomEquation[0].toString() + ' X ' + bottomEquation[1].toString()}
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
