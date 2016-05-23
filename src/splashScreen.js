import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34485E',
  },
  top: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 2,
  },
  middle: {
    flex: 5,
  },
  bottom: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'chalkduster',
    fontSize: 34,
    color: '#FFD664',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  tagline: {
    fontSize: 18,
    fontFamily: 'chalkboard SE',
    fontWeight: 'bold',
    color: '#FFD664',
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  smiley: {
    fontSize: 30,
  },
});

class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>
            BRAINCHAMP
          </Text>
          <Text style={styles.tagline}>
            Is your brain the sharpest?
          </Text>
        </View>
        <View style={[styles.middle, styles.centered]}>
          <Image source={require('./assets/logo.png')} />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.tagline}>
            Challenge your friends to find out!
          </Text>
          <Text style={styles.smiley}>
            😜 🎮 🙆
          </Text>
        </View>
      </View>
    );
  }
}

export default SplashScreen;
