import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import I18n from '../../config/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 25,
  },
  outer: {
    height: 200,
    width: 280,
    borderRadius: 20,
    backgroundColor: '#FFD664',
  },
  inner: {
    height: 160,
    width: 240,
    borderRadius: 15,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    height: 30,
    marginTop: 5,
    color: 'white',
    fontFamily: 'chalkduster',
    fontSize: 24,
  },
});

function Board(props) {
  return (
    <View style={styles.container}>
      <View style={[styles.outer, styles.centered]}>
        <View style={styles.inner}>
          {props.children}
        </View>
      </View>
    </View>
  );
}

Board.propTypes = {
  children: PropTypes.node,
};

export default Board;
