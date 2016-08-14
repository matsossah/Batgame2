import React, { PropTypes } from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    padding: 10,
    paddingLeft: 45,
    paddingRight: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FFD664',
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontFamily: 'chalkduster',
    alignSelf: 'center',
  },
});

function Button(props) {
  const { text, style, ...otherProps } = props;
  return (
    <TouchableHighlight
      {...otherProps}
      style={[styles.button].concat(style)}
      underlayColor="gray"
    >
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableHighlight>
  );
}

Button.propTypes = {
  style: PropTypes.any,
  text: PropTypes.string.isRequired,
};

export default Button;
