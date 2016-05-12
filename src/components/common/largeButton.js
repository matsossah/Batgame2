import React, {
  Component,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'chalkduster',
  },
});

class LargeButton extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }
  onPress() {
  }
  render() {
    return (
      <TouchableHighlight
        style={[styles.container, { backgroundColor: this.props.underlayColor }]}
        onPress={this.props.onPress}
        underlayColor={this.props.underlayColor}
        backgroundColor={this.props.underlayColor}
      >
        <Text style={[styles.buttonText]}>
          {this.props.buttonText}
        </Text>
      </TouchableHighlight>
    );
  }
}

LargeButton.propTypes = {
  buttonText: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  underlayColor: React.PropTypes.string.isRequired,
};

module.exports = LargeButton;
