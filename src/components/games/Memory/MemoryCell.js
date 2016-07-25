import React, { Component, PropTypes } from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
// import Emoji from 'react-native-emoji';

const styles = StyleSheet.create({
  cellText: {
    color: '#2C3D50',
    fontSize: 36,
  },
});

class MemoryCell extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    if (this.props.isFlipped === true) {
      return;
    }
    this.props.onPress(this.props.emoji, this.props.index);
  }
  render() {
    const { style } = this.props;
    return (
      <TouchableHighlight
        onPress={this.onPress}
        underlayColor="transparent"
      >
        <View
          style={style}
        >
          {this.props.isFlipped ?
            <Text style={{ fontSize: 36 }}>{this.props.emoji}</Text>
          :
            <Text style={styles.cellText} >?</Text>}
        </View>
      </TouchableHighlight>
    );
  }
}

MemoryCell.propTypes = {
  emoji: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  isFlipped: PropTypes.bool.isRequired,
};

export default MemoryCell;
