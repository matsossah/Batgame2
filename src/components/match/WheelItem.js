import React, { PropTypes, Component } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

import I18n from '../../config/i18n';

const styles = StyleSheet.create({
  wheelItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  wheelItemText: {
    flex: 5,
    fontFamily: 'chalkduster',
    overflow: 'visible',
    textAlign: 'center',
  },
  firstEmoji: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastEmoji: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class WheelItem extends Component {
  constructor() {
    super();

    this.state = {
      activeValue: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game.active !== this.props.active) {
      Animated.timing(this.state.activeValue, {
        toValue: nextProps.active ? 1 : 0,
        duration: 300,
        easing: Easing.inOut(Easing.sin),
      }).start();
    }
  }

  render() {
    const { height } = this.props;
    const { activeValue } = this.state;
    const fontSize = height / 3;
    return (
      <View style={[styles.wheelItem, { height }]}>
        <View
          style={[
            styles.firstEmoji,
          ]}
        >
          <Text style={{ fontSize }}>{this.props.game.emoji}</Text>
        </View>
        <Animated.Text
          style={[
            styles.wheelItemText,
            {
              fontSize,
              color: activeValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['#959ca6', '#FFD664'],
              }),
              transform: [
                {
                  scale: activeValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.05, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {I18n.t(this.props.game.name)}
        </Animated.Text>
        <View
          style={[
            styles.lastEmoji,
          ]}
        >
          <Text style={{ fontSize }}>{this.props.game.emoji}</Text>
        </View>
      </View>
    );
  }
}

WheelItem.propTypes = {
  height: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  game: PropTypes.object.isRequired,
};

export default WheelItem;
