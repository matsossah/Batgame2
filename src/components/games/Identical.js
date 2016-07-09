import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Template from '../common/Template';
import Duration from '../common/Duration';
import Countdown from '../common/Countdown';
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
      duration: null,
      running: true,
      started: false,
      countdownStarted: null,
      score: 0,
      currentEmoji: sample(allEmojis),
      previousEmoji: '',
    };
    this.onYesPress = this.onYesPress.bind(this);
    this.onNoPress = this.onNoPress.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.newEmoji = this.newEmoji.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
    setTimeout(this.onStarted.bind(this), 800);
  }
  onStarted() {
    this.setState({
      started: true,
      countdownStarted: Date.now(),
      previousEmoji: this.state.currentEmoji,
      currentEmoji: sample(allEmojis),
    });
  }
  onEnd() {
    this.setState({
      running: false,
      duration: 0,
    });
    this.props.onEnd({ score: this.state.score });
  }
  onYesPress() {
    if (this.state.currentEmoji === this.state.previousEmoji) {
      this.setState({
        score: this.state.score + 1,
        previousEmoji: this.state.currentEmoji,
        currentEmoji: '',
      });
      this.timeout = setTimeout(this.newEmoji, 100);
    } else {
      this.setState({
        running: false,
        duration: 30000 - (Date.now() - this.state.countdownStarted),
      });
      this.props.onEnd({ score: this.state.score });
    }
  }
  onNoPress() {
    if (this.state.currentEmoji !== this.state.previousEmoji) {
      this.setState({
        score: this.state.score + 1,
        previousEmoji: this.state.currentEmoji,
        currentEmoji: '',
      });
      this.timeout = setTimeout(this.newEmoji, 100);
    } else {
      this.setState({
        running: false,
        duration: 30000 - (Date.now() - this.state.countdownStarted),
      });
      this.props.onEnd({ score: this.state.score });
    }
  }
  newEmoji() {
    const emoji = sample(allEmojis);
    this.setState({
      currentEmoji: emoji,
    });
  }
  renderTimer() {
    if (this.state.running) {
      if (this.state.started) {
        return (<Countdown
          duration={30}
          startTime={this.state.countdownStarted}
          onComplete={this.onEnd}
        />);
      }
      return <Duration duration={30000} />;
    }
    return <Duration duration={this.state.duration} />;
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
              {this.renderTimer()}
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
  onEnd: PropTypes.func.isRequired,
};

export default Identical;
