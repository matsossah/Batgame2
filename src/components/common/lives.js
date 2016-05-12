import React, { StyleSheet, PropTypes, View } from 'react-native';

import Heart from './heart';

const HEART_SPACING = 10;

const styles = StyleSheet.create({
  hearts: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'visible',
    marginLeft: -HEART_SPACING / 2,
    marginRight: -HEART_SPACING / 2,
  },
  heart: {
    marginLeft: HEART_SPACING / 2,
    marginRight: HEART_SPACING / 2,
  },
});

function Lives(props) {
  const { lives, livesLost, style, ...otherProps } = props;
  const hearts = [];
  const n = lives - livesLost;
  for (let i = 0; i < n; i++) {
    hearts.push(<Heart key={i} full style={styles.heart} />);
  }
  for (let i = 0; i < livesLost; i++) {
    hearts.push(<Heart key={i + n} full={false} style={styles.heart} />);
  }
  return (
    <View {...otherProps} style={[styles.hearts].concat(style)}>
      {hearts}
    </View>
  );
}

Lives.propTypes = {
  style: PropTypes.any,
  lives: PropTypes.number.isRequired,
  livesLost: PropTypes.number.isRequired,
};

export default Lives;
