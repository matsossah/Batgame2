import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Template from '../common/Template';
import Timer from '../common/Timer';
import Duration from '../common/Duration';

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
  smiley: {
    fontSize: 150,
  },
});

class PopTheBalloon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      running: false,
      gameFinished: false,
      diameter: 150,
      borderWidth: 0,
      taps: 0,
    };
    this.onButtonPress = this.onButtonPress.bind(this);
  }
  onButtonPress() {
    if (this.state.taps < 49) {
      this.setState({
        running: true,
        borderWidth: this.state.borderWidth + 2,
        taps: this.state.taps + 1,
        diameter: this.state.diameter + 1,
      });
    } else {
      this.setState({
        gameFinished: true,
        running: false,
        taps: this.state.taps + 1,
        diameter: this.state.diameter + 1,
      });
    }
  }
  render() {
    return (
      <Template
        // pass the title in uppercase
        header={
          this.state.running ?
            <View style={styles.container}>
              <View style={styles.scoreBox}>
                <Text style={styles.score}>
                  {this.state.taps}
                </Text>
              </View>
              <View style={styles.timerBox}>
                <Timer startTime={0} />
              </View>
            </View>
          :
            <View style={styles.container}>
              <View style={styles.scoreBox}>
                <Text style={styles.score}>
                  {this.state.taps}
                </Text>
              </View>
              <View style={styles.timerBox}>
                <Duration duration={0} />
              </View>
            </View>
        }
        footer={
          this.state.gameFinished ?
            <View style={styles.container}>
              <Text style={styles.smiley}>🎉</Text>
            </View>
          :
            <View style={styles.container}>
              <TouchableHighlight
                onPress={this.onButtonPress}
                underlayColor="transparent"
              >
                <View
                  style={styles.bigButton}
                  width={this.state.diameter}
                  height={this.state.diameter}
                  borderRadius={this.state.diameter / 2}
                  borderWidth={this.state.borderWidth}
                />
              </TouchableHighlight>
            </View>
        }
      />
    );
  }
}

PopTheBalloon.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default PopTheBalloon;
