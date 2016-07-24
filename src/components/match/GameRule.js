import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';
import I18n from '../../config/i18n';

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

function GameRule(props) {
  return (
    <Template
      header={
        <Title>{I18n.t(props.name)}</Title>
      }
      footer={
        <View style={styles.container}>
          <View style={styles.rulesContainer}>
            <Text style={styles.rules}>
              {I18n.t(props.rule)}
            </Text>
          </View>
          <LargeButton
            buttonText={I18n.t('ok')}
            onPress={props.onEnd}
            underlayColor="#FFD664"
            borderColor="#FFD664"
          />
        </View>
      }
    />
  );
}

GameRule.propTypes = {
  name: PropTypes.string.isRequired,
  rule: PropTypes.string.isRequired,
  onEnd: PropTypes.func.isRequired,
};

export default GameRule;
