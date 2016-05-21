import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'chalkduster',
  },
});

class LargeButton extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }
  onPress() {
  }
  render() {
    const { style, buttonText, ...otherProps } = this.props;
    return (
      <TouchableHighlight
        {...otherProps}
        style={[styles.container].concat(style)}
      >
        <Text style={styles.buttonText}>
          {buttonText}
        </Text>
      </TouchableHighlight>
    );
  }
}

LargeButton.propTypes = {
  style: PropTypes.any,
  buttonText: PropTypes.string.isRequired,
};

export default LargeButton;
