import React, { Component, PropTypes } from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
// import Emoji from 'react-native-emoji';

const styles = StyleSheet.create({
  cellText: {
    color: '#2C3D50',
    fontSize: 36,
  },
});

class LuckyCell extends Component {
  constructor() {
    super();

    this.state = {
      flipped: false,
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    if (this.state.flipped === true) {
      return;
    }
    this.setState({ flipped: true });
    this.props.onPress(this.props.emoji);
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
          {this.state.flipped ?
            <Text style={{ fontSize: 36 }}>{this.props.emoji}</Text>
          :
            <Text style={styles.cellText} >?</Text>}
        </View>
      </TouchableHighlight>
    );
  }
}

LuckyCell.propTypes = {
  emoji: PropTypes.string.isRequired,
  style: PropTypes.any,
  onPress: PropTypes.func.isRequired,
};

export default LuckyCell;
