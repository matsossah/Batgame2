import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  cell: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 999,
    borderWidth: 5,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'chalkduster',
    // @TODO: Have the font size and maybe the border width be dependent on
    // the size of the cell.
    fontSize: 45,
    color: 'white',
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
    } else if (!this.props.cell.success) {
      this.props.onFailure(this.props.cell);
    }
  }

  render() {
    return (
      <View
        {...this.props}
        style={[styles.container].concat(this.props.style)}
      >
        <TouchableWithoutFeedback
          onPress={this.onPress}
        >
          <View
            style={[
              styles.cell,
              {
                borderColor: this.props.cell.color,
              },
            ]}
          >
            <Text style={styles.text}>{this.props.cell.number.toString()}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
    color: PropTypes.string.isRequired,
  }).isRequired,
  style: PropTypes.any,
};

export default NumberCell;
