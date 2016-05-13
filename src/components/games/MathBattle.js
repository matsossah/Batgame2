import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

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
    height: 60,
    width: 150,
    borderRadius: 10,
    backgroundColor: '#3498DB',
    borderWidth: 3,
    borderColor: '#FFD664',
  },
  bottomEquationButton: {
    height: 60,
    width: 150,
    borderRadius: 10,
    backgroundColor: '#4EB479',
    borderWidth: 3,
    borderColor: '#FFD664',
  },
});

class MathBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topEquation: '',
      bottomEquation: '',
      score: 0,
    };
    this.onTopPress = this.onTopPress.bind(this);
    this.onBottomPress = this.onBottomPress.bind(this);
  }
  componentWillMount() {
    this.newEquations();
  }
  onTopPress() {
    if ((eval(this.state.topEquation)) > (eval(this.state.bottomEquation))) {
      this.setState({ score: this.state.score + 1 });
      this.newEquations();
    }
  }
  onBottomPress() {
    if (eval(this.state.bottomEquation) > eval(this.state.topEquation)) {
      this.setState({ score: this.state.score + 1 });
      this.newEquations();
    }
  }
  newEquations() {
    function randomNumber() {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      return (
        numbers[Math.floor(Math.random() * numbers.length)]
      );
    }
    function randomSign() {
      const signs = [' + ', ' - ', ' / ', ' * '];
      return (
        signs[Math.floor(Math.random() * signs.length)]
      );
    }
    const top = randomNumber() + randomSign() + randomNumber() + randomSign() + randomNumber();
    const bottom = randomNumber() + randomSign() + randomNumber() + randomSign() + randomNumber();

    this.setState({
      topEquation: top,
      bottomEquation: bottom,
    });
  }
  render() {
    return (
      <Template
        // pass the title in uppercase if needed
        header={<Title>{this.state.score} points</Title>}
        footer={
          <View style={styles.container}>
            <View style={styles.equations}>
              <LargeButton
                style={styles.topEquationButton}
                buttonText={this.state.topEquation}
                onPress={this.onTopPress}
                underlayColor="#3498DB"
              />
              <LargeButton
                style={styles.bottomEquationButton}
                buttonText={this.state.bottomEquation}
                onPress={this.onBottomPress}
                underlayColor="#4EB479"
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
