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
    padding: 20,
  },
  cell: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#34485E',
  },
  cellActive: {
    backgroundColor: '#FFD664',
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
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      running: false,
      gameOver: false,
      activeCell: '',
      score: 0,
      round: 0,
    };
    this.onTopLeftPress = this.onTopLeftPress.bind(this);
    this.onTopRightPress = this.onTopRightPress.bind(this);
    this.onMiddlePress = this.onMiddlePress.bind(this);
    this.onBottomLeftPress = this.onBottomLeftPress.bind(this);
    this.onBottomRightPress = this.onBottomRightPress.bind(this);
    this.newMole = this.newMole.bind(this);
    this.timeout = setTimeout(this.newMole, 1000);
  }
  onTopLeftPress() {
    if (this.state.activeCell === 'topLeft' && this.state.round < 10) {
      this.setState({
        score: this.state.score + 1,
        activeCell: '',
      });
      this.timeout = setTimeout(this.newMole, 1000);
    } else if (this.state.activeCell === 'topLeft' && this.state.round === 10) {
      this.setState({
        score: this.state.score + 1,
        gameOver: true,
        running: false,
      });
    } else {
      this.setState({
        gameOver: true,
        running: false,
      });
    }
  }
  onTopRightPress() {
    if (this.state.activeCell === 'topRight' && this.state.round < 10) {
      this.setState({
        score: this.state.score + 1,
        activeCell: '',
      });
      this.timeout = setTimeout(this.newMole, 1000);
    } else if (this.state.activeCell === 'topRight' && this.state.round === 10) {
      this.setState({
        score: this.state.score + 1,
        gameOver: true,
        running: false,
      });
    } else {
      this.setState({
        gameOver: true,
        running: false,
      });
    }
  }
  onMiddlePress() {
    if (this.state.activeCell === 'middle' && this.state.round < 10) {
      this.setState({
        score: this.state.score + 1,
        activeCell: '',
      });
      this.timeout = setTimeout(this.newMole, 1000);
    } else if (this.state.activeCell === 'middle' && this.state.round === 10) {
      this.setState({
        score: this.state.score + 1,
        gameOver: true,
        running: false,
      });
    } else {
      this.setState({
        gameOver: true,
        running: false,
      });
    }
  }
  onBottomLeftPress() {
    if (this.state.activeCell === 'bottomLeft' && this.state.round < 10) {
      this.setState({
        score: this.state.score + 1,
        activeCell: '',
      });
      this.timeout = setTimeout(this.newMole, 1000);
    } else if (this.state.activeCell === 'bottomLeft' && this.state.round === 10) {
      this.setState({
        score: this.state.score + 1,
        gameOver: true,
        running: false,
      });
    } else {
      this.setState({
        gameOver: true,
        running: false,
      });
    }
  }
  onBottomRightPress() {
    if (this.state.activeCell === 'bottomRight' && this.state.round < 10) {
      this.setState({
        score: this.state.score + 1,
        activeCell: '',
      });
      this.timeout = setTimeout(this.newMole, 1000);
    } else if (this.state.activeCell === 'bottomRight' && this.state.round === 10) {
      this.setState({
        score: this.state.score + 1,
        gameOver: true,
        running: false,
      });
    } else {
      this.setState({
        gameOver: true,
        running: false,
      });
    }
  }
  newMole() {
    const moles = ['topLeft', 'topRight', 'middle', 'bottomLeft', 'bottomRight'];
    const mole = sample(moles);
    this.setState({ activeCell: mole, running: true, round: this.state.round + 1 });
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
                  {this.state.score}
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
                  {this.state.score}
                </Text>
              </View>
              <View style={styles.timerBox}>
                <Duration duration={0} />
              </View>
            </View>
        }
        footer={
          <View style={styles.container}>
            <View style={styles.twoCells}>
              <TouchableHighlight
                onPress={this.onTopLeftPress}
                underlayColor="transparent"
              >
                <View
                  style={[styles.cell, this.state.activeCell === 'topLeft'
                  && styles.cellActive]}
                />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.onTopRightPress}
                underlayColor="transparent"
              >
                <View
                  style={[styles.cell, this.state.activeCell === 'topRight'
                  && styles.cellActive]}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.container}>
              <TouchableHighlight
                onPress={this.onMiddlePress}
                underlayColor="transparent"
              >
                <View
                  style={[styles.cell, this.state.activeCell === 'middle'
                  && styles.cellActive]}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.twoCells}>
              <TouchableHighlight
                onPress={this.onBottomLeftPress}
                underlayColor="transparent"
              >
                <View
                  style={[styles.cell, this.state.activeCell === 'bottomLeft'
                  && styles.cellActive]}
                />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.onBottomRightPress}
                underlayColor="transparent"
              >
                <View
                  style={[styles.cell, this.state.activeCell === 'bottomRight'
                  && styles.cellActive]}
                />
              </TouchableHighlight>
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
