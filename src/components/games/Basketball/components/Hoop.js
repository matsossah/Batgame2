import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  hoopContainer: {
    position: 'absolute',
    left: (Dimensions.get('window').width / 2) - (179 / 2),
    width: 179,
    height: 112,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FFD664',
    borderRadius: 4,
  },
  hoopContained: {
    width: 70,
    height: 54,
    marginTop: 38,
    borderWidth: 5,
    borderColor: '#FFD664',
  },
});

class Hoop extends Component {
  render() {
    return (
      <View
        style={[styles.hoopContainer,
          {
            bottom: this.props.y,
          }]}
      >
        <View style={styles.hoopContained} />
      </View>
    );
  }
}

Hoop.defaultProps = {
  y: 0,
};

Hoop.propTypes = {
  y: PropTypes.number,
};

export default Hoop;
