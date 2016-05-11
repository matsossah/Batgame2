import React, {
  Text,
  TouchableHighlight,
  StyleSheet,
  Component,
} from 'react-native';

const styles = StyleSheet.create({
  facebookButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#3B47BB',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    color: 'white',
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
          F | Connect with Facebook
        </Text>
      </TouchableHighlight>
    );
  }
}

FacebookConnect.propTypes = {
  onPress: React.PropTypes.func.isRequired,
};

module.exports = FacebookConnect;
