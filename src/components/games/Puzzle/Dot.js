import React, { Component, PropTypes } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dot: {
    backgroundColor: '#FFD664',
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 3,
  },
});

class Dot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: new Animated.Value(this.props.isPlacedCorrectly ? 1 : 0.1),
      visible: this.props.isPlacedCorrectly,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isPlacedCorrectly && nextProps.isPlacedCorrectly) {
      this.animateShow();
    } else if (this.props.isPlacedCorrectly && !nextProps.isPlacedCorrectly) {
      this.animateHide();
    }
  }

  animateShow() {
    this.setState({ visible: true }, () => {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 100,
      }).start();
    });
  }

  animateHide() {
    Animated.timing(this.state.scale, {
      toValue: 0.1,
      duration: 100,
    }).start(() => this.setState({ visible: false }));
  }

  render() {
    if (!this.state.visible) {
      return null;
    }
    return (
      <Animated.View style={[styles.dot, { transform: [{ scale: this.state.scale }] }]} />
    );
  }
}

Dot.propTypes = {
  isPlacedCorrectly: PropTypes.bool.isRequired,
};

module.exports = Dot;
