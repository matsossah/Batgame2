import React, {
  StyleSheet,
  PropTypes,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import omit from 'lodash/omit';

import Template from '../common/template';
import createCountdownGame from './countdown_game';
import createLifeGame from './life_game';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});

function ExampleGame(props) {
  return (
    <Template
      {...omit(props, 'onSuccess', 'onFailure')}
      footer={
        <View style={styles.container}>
          <TouchableHighlight onPress={props.onSuccess}>
            <Text>Success</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={props.onFailure}>
            <Text>Failure</Text>
          </TouchableHighlight>
        </View>
      }
    />
  );
}

ExampleGame.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
};

export default createCountdownGame(createLifeGame(ExampleGame));
