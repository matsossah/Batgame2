import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cell: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#34485E',
  },
  cellActive: {
    backgroundColor: '#FFD664',
  },
});

class WhackAMoleCell extends Component {
  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.cell);
  }

  render() {
    const { isActive, style } = this.props;
    return (
      <TouchableHighlight
        onPress={this.onPress}
        underlayColor="transparent"
      >
        <View
          style={[
            styles.cell,
            isActive && styles.cellActive,
          ].concat(style)}
        />
      </TouchableHighlight>
    );
  }
}

WhackAMoleCell.propTypes = {
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  style: PropTypes.any,
  cell: PropTypes.any.isRequired,
};

export default WhackAMoleCell;
