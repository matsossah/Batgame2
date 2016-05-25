import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
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
  topSeparator: {
    height: 1,
    width: 220,
    backgroundColor: 'white',
    marginTop: 30,
  },
  separator: {
    height: 1,
    width: 220,
    backgroundColor: 'white',
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
  input: {
    height: 35,
    width: 220,
    alignSelf: 'center',
    fontSize: 14,
    color: 'white',
    fontFamily: 'chalkduster',
  },
  button: {
    backgroundColor: '#4EB479',
    borderColor: 'transparent',
  },
});

class Board extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
    };
  }
  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.outer, styles.centered]}>
          <View style={styles.inner}>
            <Text style={styles.label}>Au Tableau!</Text>
              {this.props.children}
          </View>
        </View>
      </View>
    );
  }
}

Board.propTypes = {
  children: PropTypes.node,
};

export default Board;
