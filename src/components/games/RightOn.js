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
  button: {
    height: 120,
    width: 120,
    borderRadius: 60,
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

class RightOn extends Component {
  constructor() {
    super();
    this.state = {
      startTime: null,
      duration: null,
      running: false,
      laps: [],
    };
    this.handleLapPress = this.handleLapPress.bind(this);
    this.onStarted = this.onStarted.bind(this);
    this.timeout = setTimeout(this.onStarted, 1000);
  }
  onStarted() {
    this.setState({
      running: true,
      startTime: Date.now(),
    });
  }
  laps() {
    return this.state.laps.map((time, index) => {
      return (
        <View key={index} style={[styles.lap, borderStyles[index]]}>
          <Text style={[styles.lapText, colorStyles[index]]}>
            {index + 1} | {formatDuration(time)}
          </Text>
        </View>
      );
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
  handleLapPress() {
    const lap = Date.now() - this.state.startTime;

    if (this.state.laps.length < 2) {
      this.setState({
        startTime: Date.now(),
        laps: this.state.laps.concat([lap]),
      });
    } else if (this.state.laps.length === 2) {
      this.setState({
        running: false,
        laps: this.state.laps.concat([lap]),
      });
      const score = (
        Math.abs(this.state.laps[0] - 3000) +
        Math.abs(this.state.laps[1] - 3000) +
        Math.abs(lap - 3000)
      );
      this.props.onEnd({ score });
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
              {this.state.running && <Timer startTime={this.state.startTime} />}
            </View>
          </View>
        }
        footer={
          <View style={styles.container}>
            <View style={styles.laps}>
              {this.laps()}
            </View>
            <View style={styles.buttonWrapper}>
              {this.lapButton()}
            </View>
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
