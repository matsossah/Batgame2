import React, { PropTypes } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

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
    <TouchableOpacity
      {...otherProps}
      activeOpacity={0.6}
    >
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
    </TouchableOpacity>
  );
}

LargeButton.propTypes = {
  style: PropTypes.any,
  buttonTextStyle: PropTypes.any,
  buttonText: PropTypes.string.isRequired,
  underlayColor: PropTypes.string.isRequired,
};

export default LargeButton;
