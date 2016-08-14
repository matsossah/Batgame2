import React, { Component, PropTypes } from 'react';
import { View, Text, Animated, PanResponder, StyleSheet } from 'react-native';

import Dot from './Dot';

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    backgroundColor: '#3498DB',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: '#34485E',
    borderWidth: 2,
  },
  text: {
    color: '#34485E',
    fontSize: 20,
    fontFamily: 'chalkduster',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotRow: {
    alignItems: 'flex-start',
  },
});

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(this.props.coordinates[this.props.axis] * this.props.size),
      scale: new Animated.Value(this.props.visible ? 1 : 0.01),
    };

    this.getStyle = this.getStyle.bind(this);
    this.animateHide = this.animateHide.bind(this);
    this.animateShow = this.animateShow.bind(this);
  }

  componentWillMount() {
    this.lastDistance = 0;
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e, gestureState) => this.props.axis && this.props.direction, // eslint-disable-line no-unused-vars
      onPanResponderGrant: (e, gestureState) => { // eslint-disable-line no-unused-vars
        this.state.value.setOffset(this.state.value.__getValue());
        this.state.value.setValue(0);
      },
      onPanResponderMove: (e, gestureState) => {
        const absDistance = this.props.direction * gestureState['d' + this.props.axis];
        if (absDistance > 0 && absDistance < this.props.size) {
          this.state.value.setValue(gestureState['d' + this.props.axis]);
          this.lastDistance = gestureState['d' + this.props.axis];
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const absDistance = this.props.direction * gestureState['d' + this.props.axis];
        if (absDistance > this.props.size / 3) {
          Animated.timing(this.state.value, {
            toValue: this.props.direction * this.props.size,
            duration: 100,
          }).start(this.props.onMoved);
          // this.state.value.flattenOffset()
        } else {
          Animated.spring(this.state.value, {
            toValue: 0,
          }).start();
        }
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible && !nextProps.visible) {
      this.animateHide();
    } else if (!this.props.visible && nextProps.visible) {
      this.animateShow();
    }
    this.setState({ value: new Animated.Value(nextProps.coordinates[nextProps.axis] * nextProps.size) });
  }

  getStyle() {
    return [
      styles.tile,
      {
        top: this.props.axis === 'y' ? this.state.value : this.props.coordinates.y * this.props.size,
        left: this.props.axis === 'x' ? this.state.value : this.props.coordinates.x * this.props.size,
        width: this.props.size,
        height: this.props.size,
        transform: [
          { scale: this.state.scale },
        ],
      },
    ];
  }

  animateHide() {
    Animated.timing(this.state.scale, {
      toValue: 0.01,
      duration: 200,
      delay: this.props.index * 20,
    }).start();
  }

  animateShow() {
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: 200,
      delay: this.props.index * 20,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={this.getStyle()}
        {...this._panResponder.panHandlers}
      >
        <View style={styles.row} />
        <View style={styles.row}>
          <Text style={styles.text}>{this.props.index}</Text>
        </View>
        <View style={[styles.row, styles.dotRow]}>
          <Dot isPlacedCorrectly={this.props.isPlacedCorrectly} />
        </View>
      </Animated.View>
    );
  }
}

Tile.propTypes = {
  coordinates: PropTypes.object.isRequired,
  axis: PropTypes.string.isRequired,
  direction: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  isPlacedCorrectly: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onMoved: PropTypes.func.isRequired,
};

module.exports = Tile;
