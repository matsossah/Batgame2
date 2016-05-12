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
    if (this.props.current) {
      this.props.onSuccess(this.props.cell);
    } else {
      this.props.onFailure(this.props.cell);
    }
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
  current: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  cell: PropTypes.shape({
    number: PropTypes.number.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  style: PropTypes.any,
};

export default NumberCell;
