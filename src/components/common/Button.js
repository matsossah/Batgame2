import React, { PropTypes } from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFD664',
    borderColor: '#FFD664',
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
