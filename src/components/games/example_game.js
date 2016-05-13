import React, {
  StyleSheet,
  PropTypes,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

import Template from '../common/template';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});

function ExampleGame(props) {
  const { onAction, ...otherProps } = props;

  return (
    <Template
      {...otherProps}
      footer={
        <View style={styles.container}>
          <TouchableHighlight
            onPress={() => {
              onAction({ type: 'success' });
            }}
          >
            <Text>Success</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              onAction({ type: 'failure' });
            }}
          >
            <Text>Failure</Text>
          </TouchableHighlight>
        </View>
      }
    />
  );
}

ExampleGame.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default ExampleGame;
