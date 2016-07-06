import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginBottom: 50,
  },
  rulesContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  rules: {
    fontSize: 24,
    fontFamily: 'chalkduster',
    color: 'white',
    textAlign: 'center',
  },
});

function RedGreenBlueRules(props) {
  return (
    <Template
      header={
        <Title>RED GREEN BLUE</Title>
      }
      footer={
        <View style={styles.container}>
          <View style={styles.rulesContainer}>
            <Text style={styles.rules}>
              Press on the color that’s on the board as fast as possible!
            </Text>
          </View>
          <LargeButton
            buttonText="START"
            onPress={props.onEnd}
            underlayColor="#FFD664"
            borderColor="#FFD664"
          />
        </View>
      }
    />
  );
}

RedGreenBlueRules.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default RedGreenBlueRules;
