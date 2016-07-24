import React, { Component, PropTypes } from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import Template from '../common/Template';
import Timer from '../common/Timer';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  scoreBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  score: {
    fontSize: 30,
    color: '#FFD664',
    fontFamily: 'chalkduster',
  },
  laps: {
    flex: 4,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timerBox: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  char: {
    fontFamily: 'chalkduster',
    fontSize: 40,
    color: '#FFD664',
  },
  button: {
    height: 60,
    width: 150,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD664',
  },
  lap: {
    height: 70,
    width: 200,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
  },
  lapText: {
    fontSize: 30,
    color: '#FFD664',
    fontFamily: 'chalkduster',
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'chalkduster',
  },
});

const borderStyles = StyleSheet.create({
  0: {
    borderColor: '#E74C3C',
  },
  1: {
    borderColor: '#3498DB',
  },
  2: {
    borderColor: '#4EB479',
  },
  '#FFD664': {
    borderColor: '#FFD664',
  },
});

const colorStyles = StyleSheet.create({
  0: {
    color: '#E74C3C',
  },
  1: {
    color: '#3498DB',
  },
  2: {
    color: '#4EB479',
  },
  '#FFD664': {
    color: '#FFD664',
  },
});

function formatDuration(d) {
  // This approach has issues
  // See https://github.com/moment/moment/issues/1048
  return moment.utc(d).format('s.SS');
}

function formatTimer(d) {
  // This approach has issues
  // See https://github.com/moment/moment/issues/1048
  return moment.utc(d).format('mm.ss.SS');
}

class RightOn extends Component {
  constructor() {
    super();
    this.state = {
      startTime: 0,
      duration: null,
      running: false,
      lapOne: 0,
      lapTwo: 0,
      lapThree: 0,
    };
    this.handleLapPress = this.handleLapPress.bind(this);
    this.onStarted = this.onStarted.bind(this);
  }
  onStarted() {
    this.setState({
      running: true,
      startTime: Date.now(),
    });
  }
  lapButton() {
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleLapPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          GO
        </Text>
      </TouchableHighlight>
    );
  }
  startButton() {
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.onStarted}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          START
        </Text>
      </TouchableHighlight>
    );
  }
  handleLapPress() {
    const lap = Date.now() - this.state.startTime;

    if (this.state.lapOne !== 0 && this.state.lapTwo !== 0) {
      this.setState({
        running: false,
        lapThree: lap,
      });
      const score = (
        Math.abs(this.state.lapOne - 3000) +
        Math.abs(this.state.lapTwo - 3000) +
        Math.abs(lap - 3000)
      );
      this.props.onEnd({ score });
    } else if (this.state.lapOne !== 0) {
      this.setState({
        startTime: Date.now(),
        lapTwo: lap,
      });
    } else {
      this.setState({
        startTime: Date.now(),
        lapOne: lap,
      });
    }
  }
  render() {
    return (
      <Template
        header={
          <View style={styles.container}>
            <View style={styles.scoreBox}>
              <Text style={styles.score}>
                {this.state.taps}
              </Text>
            </View>
            <View style={styles.timerBox}>
              {this.state.running ?
                <Timer startTime={this.state.startTime} />
              :
                <Text style={styles.char}>{formatTimer(0)}</Text>
              }
            </View>
          </View>
        }
        footer={
          <View style={styles.container}>
            <View style={styles.laps}>
              <View style={[styles.lap, borderStyles[0]]}>
                <Text style={[styles.lapText, colorStyles[0]]}>
                  1 | {formatDuration(this.state.lapOne)}
                </Text>
              </View>
              <View style={[styles.lap, borderStyles[1]]}>
                <Text style={[styles.lapText, colorStyles[1]]}>
                  2 | {formatDuration(this.state.lapTwo)}
                </Text>
              </View>
              <View style={[styles.lap, borderStyles[2]]}>
                <Text style={[styles.lapText, colorStyles[2]]}>
                  3 | {formatDuration(this.state.lapThree)}
                </Text>
              </View>
            </View>
            {this.state.running ?
              <View style={styles.buttonWrapper}>
                {this.lapButton()}
              </View>
            :
              <View style={styles.buttonWrapper}>
                {this.startButton()}
              </View>
            }
          </View>
        }
      />
    );
  }
}

RightOn.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default RightOn;
