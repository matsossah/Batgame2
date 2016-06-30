import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

function StoplightRules(props) {
  return (
    <View>
      <Text>yadda yadda yadda</Text>
      <TouchableHighlight onPress={props.onEnd}>
        <Text>Start!</Text>
      </TouchableHighlight>
    </View>
  );
}

StoplightRules.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default StoplightRules;
