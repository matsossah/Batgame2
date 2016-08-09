import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  floorContainer: {
    backgroundColor: '#2C3D50',
    position: 'absolute',
    width: Dimensions.get('window').width,
    bottom: 0,
  },
});

class Floor extends Component {
  render() {
    return (
      <View style={[styles.floorContainer, { height: this.props.height }]} />
    );
  }
}

Floor.defaultProps = {
  heght: 10,
};

Floor.propTypes = {
  height: PropTypes.number,
};

export default Floor;
