import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Parse from 'parse/react-native';

import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';

import { normalizeMatch } from '../../normalize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
  },
  buttonsView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 6,
  },
  newGame: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'green',
  },
});

class PickOpponent extends Component {
  constructor(props) {
    super(props);
    this.onFacebookPress = this.onFacebookPress.bind(this);
    this.onRandomPress = this.onRandomPress.bind(this);
    this.onSearchPress = this.onSearchPress.bind(this);
  }
  onFacebookPress() {
  }
  onRandomPress() {
    // @TODO: show loader or move into another view while looking for a match
    Parse.Cloud
      .run('joinRandomMatch')
      .then(match => {
        this.props.navigator.push({ name: 'match', match: normalizeMatch(match) });
      })
      .catch(err => {
        // @TODO: correctly handle error
        console.error(err);
      });
  }
  onSearchPress() {
  }
  render() {
    return (
      <Template
        // pass the title in uppercase
        header={<Title>PICK YOUR VICTIM!</Title>}
        footer={
          <View style={styles.container}>
            <View style={styles.empty} />
            <View style={styles.buttonsView}>
              <LargeButton
                style={styles.newGame}
                buttonText="FACEBOOK FRIENDS"
                onPress={this.onFacebookPress}
                underlayColor="#3498DB"
                disabled
              />
              <LargeButton
                style={styles.newGame}
                buttonText="RANDOM OPPONENT"
                onPress={this.onRandomPress}
                underlayColor="#E67E2C"
              />
              <LargeButton
                style={styles.newGame}
                buttonText="SEARCH BY USERNAME"
                onPress={this.onSearchPress}
                underlayColor="#583B67"
                disabled
              />
            </View>
            <View style={styles.empty} />
          </View>
        }
      />
    );
  }
}

PickOpponent.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default PickOpponent;
