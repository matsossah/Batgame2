import React, { PropTypes } from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'chalkduster',
  },
});


function LargeButton(props) {
  const { style, buttonText, underlayColor, fontSize, ...otherProps } = props;
  return (
    <TouchableHighlight
      {...otherProps}
      style={[
        styles.container,
        { backgroundColor: underlayColor },
      ].concat(style)}
    >
      <Text
        style={[
          styles.buttonText,
          { fontSize: fontSize },
        ]}
      >
        {buttonText}
      </Text>
    </TouchableHighlight>
  );
}

LargeButton.propTypes = {
  style: PropTypes.any,
  buttonText: PropTypes.string.isRequired,
  underlayColor: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
};

export default LargeButton;
