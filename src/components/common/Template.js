import React, { PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3D50',
  },
  header: {
    backgroundColor: '#34485E',
    flex: 25,
    alignSelf: 'stretch',
  },
  separator: {
    flex: 2,
    backgroundColor: '#FFD664',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 73,
    alignSelf: 'stretch',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Template(props) {
  const { header, footer, separator, style, separatorStyle, ...otherProps } = props;
  return (
    <View {...otherProps} style={[styles.container, styles.centered, style]}>
      <View style={[styles.header, styles.centered]}>
        {header}
      </View>
      <View style={[styles.separator, separatorStyle]}>
        {separator}
      </View>
      <View style={[styles.footer, styles.centered]}>
        {footer}
      </View>
    </View>
  );
}

Template.propTypes = {
  style: PropTypes.any,
  separatorStyle: PropTypes.any,
  header: PropTypes.node.isRequired,
  separator: PropTypes.node,
  footer: PropTypes.node.isRequired,
  message: PropTypes.string,
};

export default Template;
