import React, { PropTypes } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

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
  const { style, buttonText, underlayColor, buttonTextStyle, ...otherProps } = props;
  return (
    <TouchableWithoutFeedback {...otherProps}>
      <View
        style={[
          styles.container,
          { backgroundColor: underlayColor },
        ].concat(style)}
      >
        <Text
          style={[
            styles.buttonText,
          ].concat(buttonTextStyle)}
        >
          {buttonText}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

LargeButton.propTypes = {
  style: PropTypes.any,
  buttonTextStyle: PropTypes.any,
  buttonText: PropTypes.string.isRequired,
  underlayColor: PropTypes.string.isRequired,
};

export default LargeButton;
