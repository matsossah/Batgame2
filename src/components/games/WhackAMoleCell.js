import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cell: {
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    borderRadius: 45,
    backgroundColor: '#34485E',
  },
  cellActive: {
    backgroundColor: '#FFD664',
  },
  mole: {
    fontSize: 50,
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
          ].concat(style)}
        >
          {isActive && <Text style={styles.mole}>🐭</Text>}
        </View>
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
