import React, {
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontFamily: 'chalkduster',
    color: '#FFD664',
  },
});

function Title(props) {
  return (
    <Text {...props} style={[styles.title].concat(props.style)} />
  );
}

Title.propTypes = {
  style: React.PropTypes.any,
};

module.exports = Title;
