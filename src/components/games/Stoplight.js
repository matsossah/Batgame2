import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import Template from '../common/Template';
import Timer from '../common/Timer';
import Duration from '../common/Duration';
import LargeButton from '../common/LargeButton';

const styles = StyleSheet.create({
  stoplight: {
    height: 250,
    width: 100,
    borderRadius: 8,
    flexDirection: 'column',
    borderColor: '#583B67',
    borderWidth: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  light: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 5,
    backgroundColor: 'transparent',
  },
  redlight: {
    borderColor: '#E74C3C',
  },
  activeRedlight: {
    backgroundColor: '#E74C3C',
  },
  orangelight: {
    borderColor: '#E67E2C',
  },
  activeOrangelight: {
    backgroundColor: '#E67E2C',
  },
  greenlight: {
    borderColor: '#4EB479',
  },
  activeGreenlight: {
    backgroundColor: '#4EB479',
  },
  newGame: {
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#FFD664',
  },
});

class Stoplight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      running: false,
      score: 0,
      color: '',
      message: '',
    };
    this.onGoPress = this.onGoPress.bind(this);
    this.goRed = this.goRed.bind(this);
    this.goOrange = this.goOrange.bind(this);
    this.goGreen = this.goGreen.bind(this);
    this.timeout = setTimeout(this.goRed, 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  onGoPress() {
    if (this.state.running) {
      return (
        this.setState({
          running: false,
          score: Date.now() - this.state.startTime,
          message: 'Well Done!',
        })
      );
    }

    clearTimeout(this.timeout);

    return (
      this.setState({
        score: 1000,
        message: 'False Start!',
      })
    );
  }
  goRed() {
    this.setState({ color: 'red' });
    this.timeout = setTimeout(this.goOrange, 1000);
  }
  goOrange() {
    this.setState({ color: 'orange' });
    this.timeout = setTimeout(this.goGreen, 5000 * Math.random() + 5000);
  }
  goGreen() {
    this.setState({ color: 'green', startTime: Date.now(), running: true });
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
        message={this.state.message}
        footer={
          <View style={styles.container}>
            <View style={styles.stoplight}>
              <View
                style={[
                  styles.light,
                  styles.redlight,
                  this.state.color === 'red' && styles.activeRedlight,
                ]}
              />
              <View
                style={[
                  styles.light,
                  styles.orangelight,
                  this.state.color === 'orange' && styles.activeOrangelight,
                ]}
              />
              <View
                style={[
                  styles.light,
                  styles.greenlight,
                  this.state.color === 'green' && styles.activeGreenlight,
                ]}
              />
            </View>
            <LargeButton
              style={styles.newGame}
              buttonText="GO!"
              onPress={this.onGoPress}
              underlayColor={this.state.color === 'green' ? '#4EB479' : 'red'}
              backgroundColor="#FFD664"
              borderColor="transparent"
            />
          </View>
        }
      />
    );
  }
}

Stoplight.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default Stoplight;
