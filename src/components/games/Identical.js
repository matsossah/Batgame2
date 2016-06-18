import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Template from '../common/Template';
import Timer from '../common/Timer';
import Duration from '../common/Duration';
import sample from 'lodash/sample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  emojiBox: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  choice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  bigEmoji: {
    fontSize: 150,
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
  yes: {
    backgroundColor: '#4EB479',
  },
  no: {
    backgroundColor: '#E74C3C',
  },
  label: {
    fontSize: 30,
    fontFamily: 'chalkduster',
    color: 'white',
  },
});

const allEmojis = ['😎', '😘', '😅'];

class Identical extends Component {
  constructor() {
    super();
    this.state = {
      startTime: null,
      duration: null,
      running: true,
      started: false,
      score: 0,
      currentEmoji: sample(allEmojis),
      previousEmoji: '😎',
    };
    this.onYesPress = this.onYesPress.bind(this);
    this.onNoPress = this.onNoPress.bind(this);
    setTimeout(this.onStarted.bind(this), 3000);
  }
  onStarted() {
    this.setState({
      started: true,
      previousEmoji: this.state.currentEmoji,
      currentEmoji: sample(allEmojis),
    });
  }
  onYesPress() {
    if (this.state.currentEmoji === this.state.previousEmoji) {
      this.setState({
        score: this.state.score + 1,
        previousEmoji: this.state.currentEmoji,
        currentEmoji: sample(allEmojis),
      });
    } else {
      this.setState({
        running: false,
        duration: Date.now() - this.state.startTime,
      });
    }
  }
  onNoPress() {
    if (this.state.currentEmoji !== this.state.previousEmoji) {
      this.setState({
        score: this.state.score + 1,
        previousEmoji: this.state.currentEmoji,
        currentEmoji: sample(allEmojis),
      });
    } else {
      this.setState({
        running: false,
        duration: Date.now() - this.state.startTime,
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
                {this.state.score}
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
          <View style={styles.container}>
            <View style={styles.emojiBox}>
              <Text style={styles.bigEmoji}>{this.state.currentEmoji}</Text>
            </View>
            {this.state.started ?
              <View style={styles.options}>
                <TouchableHighlight
                  onPress={this.onYesPress}
                  underlayColor="transparent"
                  style={[styles.yes, styles.choice]}
                >
                  <View>
                    <Text style={styles.label}>YES</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={this.onNoPress}
                  underlayColor="transparent"
                  style={[styles.no, styles.choice]}
                >
                  <View>
                    <Text style={styles.label}>NO</Text>
                  </View>
                </TouchableHighlight>
              </View>
              :
              <View style={styles.options} />
            }
          </View>
        }
      />
    );
  }
}

Identical.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default Identical;
