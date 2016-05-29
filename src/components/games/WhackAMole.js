import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import sample from 'lodash/sample';

import Template from '../common/Template';
import Timer from '../common/Timer';
import Duration from '../common/Duration';
import WhackAMoleCell from './WhackAMoleCell';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 20,
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
  twoCells: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

class WhackAMole extends Component {
  constructor() {
    super();
    this.state = {
      startTime: Date.now(),
      duration: null,
      running: true,
      activeCell: null,
      score: 0,
      round: 0,
    };
    this.onCellPress = this.onCellPress.bind(this);
    this.newMole = this.newMole.bind(this);
    this.timeout = setTimeout(this.newMole, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onCellPress(cell) {
    if (!this.state.running) {
      return;
    }

    if (this.state.activeCell === cell) {
      if (this.state.round < 10) {
        this.setState({
          score: this.state.score + 1,
          activeCell: null,
        });
        this.timeout = setTimeout(this.newMole, 1000);
      } else {
        this.setState({
          score: this.state.score + 1,
          activeCell: null,
          running: false,
          duration: Date.now() - this.state.startTime,
        });
        clearTimeout(this.timeout);
      }
    } else {
      this.setState({
        activeCell: null,
        running: false,
        duration: Date.now() - this.state.startTime,
      });
      clearTimeout(this.timeout);
    }
  }

  newMole() {
    const moles = ['topLeft', 'topRight', 'middle', 'bottomLeft', 'bottomRight'];
    const mole = sample(moles);
    this.setState({
      activeCell: mole,
      round: this.state.round + 1,
    });
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
              {
                this.state.running ?
                  <Timer startTime={this.state.startTime} /> :
                  <Duration duration={this.state.duration} />
              }
            </View>
          </View>
        }
        footer={
          <View style={styles.container}>
            <View style={styles.twoCells}>
              <WhackAMoleCell
                cell="topLeft"
                isActive={this.state.activeCell === 'topLeft'}
                onPress={this.onCellPress}
              />
              <WhackAMoleCell
                cell="topRight"
                isActive={this.state.activeCell === 'topRight'}
                onPress={this.onCellPress}
              />
            </View>
            <View style={styles.container}>
              <WhackAMoleCell
                cell="middle"
                isActive={this.state.activeCell === 'middle'}
                onPress={this.onCellPress}
              />
            </View>
            <View style={styles.twoCells}>
              <WhackAMoleCell
                cell="bottomLeft"
                isActive={this.state.activeCell === 'bottomLeft'}
                onPress={this.onCellPress}
              />
              <WhackAMoleCell
                cell="bottomRight"
                isActive={this.state.activeCell === 'bottomRight'}
                onPress={this.onCellPress}
              />
            </View>
          </View>
        }
      />
    );
  }
}

WhackAMole.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default WhackAMole;
