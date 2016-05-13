import React, { StyleSheet, PropTypes, View, Text } from 'react-native';
import moment from 'moment';

function formatDuration(d) {
  // This approach has issues
  // See https://github.com/moment/moment/issues/1048
  return moment.utc(d.asMilliseconds()).format('mm:ss.SS');
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // For animation purposes: see heart.js
    backgroundColor: 'transparent',
  },
  char: {
    fontFamily: 'chalkduster',
    fontSize: 40,
    color: '#FFD664',
  },
  numberChar: {
    width: 30,
  },
  symbolChar: {
    width: 16,
  },
});

function Duration(props) {
  const { duration, style, ...otherProps } = props;
  return (
    <View {...otherProps} style={[styles.container].concat(style)}>
      {formatDuration(duration).split('').map((c, idx) => {
        const code = c.charCodeAt(0);
        const isNumber = code >= 48 && code <= 57;
        return (
          <Text
            key={idx}
            style={[
              styles.char,
              isNumber ? styles.numberChar : styles.symbolChar,
            ]}
          >
            {c}
          </Text>
        );
      })}
    </View>
  );
}

Duration.propTypes = {
  style: PropTypes.any,
  duration: PropTypes.object.isRequired, // moment.duration(...)
};

export default Duration;
