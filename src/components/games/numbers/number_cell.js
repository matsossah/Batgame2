import React, {
  StyleSheet,
  Component,
  PropTypes,
  TouchableHighlight,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 999,
    borderWidth: 3,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: 'transparent',
  },
});

class NumberCell extends Component {
  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.cell);
  }

  render() {
    return (
      <TouchableHighlight
        {...this.props}
        style={[styles.cell].concat(this.props.style)}
        onPress={this.onPress}
      >
        <Text style={styles.text}>{this.props.cell.number.toString()}</Text>
      </TouchableHighlight>
    );
  }
}

NumberCell.propTypes = {
  onPress: PropTypes.func.isRequired,
  cell: PropTypes.shape({
    number: PropTypes.number.isRequired,
    valid: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  }).isRequired,
  style: PropTypes.any,
};

export default NumberCell;
