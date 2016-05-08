import React, {
	View,
	StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#34485E',
    flex: 25,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  separator: {
    flex: 2,
    backgroundColor: '#FFD664',
    alignSelf: 'stretch',
  },
  footer: {
    backgroundColor: '#2C3D50',
    flex: 73,
    alignSelf: 'stretch',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Template(props) {
  const { header, footer, style, ...otherProps } = props;
  return (
    <View {...otherProps} style={[styles.container, styles.centered, style]}>
      <View style={[styles.header, styles.centered]}>
        {header}
      </View>
      <View style={styles.separator} />
      <View style={[styles.footer, styles.centered]}>
        {footer}
      </View>
    </View>
  );
}

Template.propTypes = {
  style: React.PropTypes.any,
  header: React.PropTypes.node.isRequired,
  footer: React.PropTypes.node.isRequired,
};

module.exports = Template;
