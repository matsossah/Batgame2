import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import LuckyCell from './LuckyCell';

import shuffle from 'lodash/shuffle';

import Template from '../common/Template';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojis: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
  },
  score: {
    fontSize: 20,
    fontFamily: 'chalkduster',
    color: '#FFD664',
    marginRight: 10,
  },
  cell: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#34485E',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

const allEmojis = ['🤑', '😎', '💪', '😋', '😜', '😘', '🙆', '👏', '😅', '🤗', '💃', '☠'];

class Lucky extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      emojis: shuffle(allEmojis),
      running: true,
    };
    this.emojiList = this.emojiList.bind(this);
    this.onCellPress = this.onCellPress.bind(this);
  }
  onCellPress(emoji) {
    if (emoji === '☠') {
      this.setState({ running: false });
      this.props.onEnd({ score: this.state.score });
    } else {
      this.setState({ score: this.state.score + 1 });
    }
  }
  emojiList() {
    return this.state.emojis.map((emoji, i) => {
      return (
        <LuckyCell
          style={styles.cell}
          onPress={this.onCellPress}
          key={i}
          underlayColor="transparent"
          emoji={emoji}
        />
      );
    });
  }
  render() {
    return (
      <Template
        header={
          <View style={styles.container}>
            <Text style={styles.score}>
              {this.state.score}
            </Text>
          </View>
        }
        footer={
          <View style={styles.container}>
            <View style={styles.emojis}>
              {this.emojiList()}
            </View>
          </View>
        }
      />
    );
  }
}

Lucky.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default Lucky;
