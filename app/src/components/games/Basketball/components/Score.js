import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  scoreContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

class Score extends Component {
  render() {
    const { fontSize } = this.props;
    return (
      <View
        style={[styles.scoreContainer,
          {
            bottom: this.props.y,
            width: Dimensions.get('window').width,
          }]}
      >
        <Text
          style={[{
            flex: 1,
            fontSize,
            fontWeight: '100',
            color: '#707070',
          }]}
        >
          {this.props.score}
        </Text>
      </View>
    );
  }
}

Score.defaultProps = {
  y: 0,
  scored: null,
  score: 0,
};

Score.propTypes = {
  y: PropTypes.number,
  scored: PropTypes.bool,
  score: PropTypes.number,
  fontSize: PropTypes.number,
};

export default Score;
