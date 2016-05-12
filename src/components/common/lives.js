import React, { StyleSheet, PropTypes, View, Text } from 'react-native';

const styles = StyleSheet.create({
  heart: {

  },
});

function Lives(props) {
  const { lives, livesLost, ...otherProps } = props;
  const hearts = [];
  for (let i = 0; i < lives - livesLost; i++) {
    hearts.push(<Text key={i} style={styles.heart}>{'<3'}</Text>);
  }
  return (
    <View {...otherProps}>
      {hearts}
    </View>
  );
}

Lives.propTypes = {
  lives: PropTypes.number.isRequired,
  livesLost: PropTypes.number.isRequired,
};

export default Lives;
