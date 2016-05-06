import React, {
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFD664',
    borderColor: '#FFD664',
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontFamily: 'chalkduster',
    alignSelf: 'center',
  },
});

class Button extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'gray'}
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

module.exports = Button;
