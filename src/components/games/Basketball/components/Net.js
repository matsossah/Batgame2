import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  netContainer: {
    position: 'absolute',
    backgroundColor: '#E74C3C',
    borderRadius: 3,
  },
});

class Net extends Component {
  render() {
    return (
      <View
        style={[styles.netContainer,
          {
            left: this.props.x,
            bottom: this.props.y,
            height: this.props.height,
            width: this.props.width,
          }]}
      />
    );
  }
}

Net.defaultProps = {
  x: 0,
  y: 0,
  height: 10,
  width: 10,
};

Net.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Net;
