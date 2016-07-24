import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Template from '../common/Template';
import Timer from '../common/Timer';
import Duration from '../common/Duration';
// import Emoji from 'react-native-emoji';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  bigButton: {
    backgroundColor: '#E74C3C',
    borderColor: '#4EB479',
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

class PopTheBalloon extends Component {
  constructor() {
    super();
    this.state = {
      startTime: Date.now(),
      duration: null,
      running: true,
      taps: 0,
    };
    this.onButtonPress = this.onButtonPress.bind(this);
  }
  onButtonPress() {
    if (this.state.taps < 49) {
      this.setState({
        taps: this.state.taps + 1,
      });
    } else {
      const score = Date.now() - this.state.startTime;
      this.setState({
        running: false,
        duration: score,
        taps: this.state.taps + 1,
      });
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
              {this.state.running ?
                <Timer startTime={this.state.startTime} /> :
                <Duration duration={this.state.duration} />
              }
            </View>
          </View>
        }
        footer={
          this.state.running ?
            <View style={styles.container}>
              <TouchableHighlight
                onPress={this.onButtonPress}
                underlayColor="transparent"
              >
                <View
                  style={[
                    styles.bigButton,
                    {
                      width: 150 + this.state.taps,
                      height: 150 + this.state.taps,
                      borderRadius: (150 + this.state.taps) / 2,
                      borderWidth: this.state.taps * 2,
                    },
                  ]}
                />
              </TouchableHighlight>
            </View>
            :
            <View style={styles.container}>
              <Text style={{ fontSize: 150 }}>🎉</Text>
            </View>
        }
      />
    );
  }
}

PopTheBalloon.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default PopTheBalloon;
