import React, { Component, PropTypes } from 'react';
import { StyleSheet, Animated } from 'react-native';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});

class Modal extends Component {
  getAnimatedStyle() {
    const {
      layout,
      position,
      scene,
    } = this.props;

    const {
      index,
    } = scene;

    const inputRange = [index - 1, index, index + 1];
    const height = layout.initHEight;
    const translateY = position.interpolate({
      inputRange,
      outputRange: [height, 0, -10],
    });

    return {
      transform: [
        { translateY },
      ],
    };
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.modal,
          // this.getAnimatedStyle(),
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default Modal;
