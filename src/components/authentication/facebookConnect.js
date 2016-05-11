import React, {
  Text,
  TouchableHighlight,
  StyleSheet,
  Component,
} from 'react-native';

const styles = StyleSheet.create({
  facebookButton: {
    alignSelf: 'stretch',
    height: 30,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'chalkduster',
  },
});

class FacebookConnect extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
  }
  render() {
    return (
      <TouchableHighlight
        style={styles.facebookButton}
        underlayColor={'gray'}
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>
          Facebook Connect
        </Text>
      </TouchableHighlight>
    );
  }
}

FacebookConnect.propTypes = {
  onPress: React.PropTypes.func.isRequired,
};

module.exports = FacebookConnect;
