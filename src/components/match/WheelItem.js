import React, { PropTypes, Component } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wheelItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  wheelItemText: {
    fontFamily: 'chalkduster',
    overflow: 'visible',
    textAlign: 'center',
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
    if (nextProps.game.active !== this.props.game.active) {
      Animated.timing(this.state.activeValue, {
        toValue: nextProps.game.active ? 1 : 0,
        duration: 300,
        easing: Easing.inOut(Easing.sin),
      }).start();
    }
  }

  render() {
    const { height, game } = this.props;
    const { activeValue } = this.state;
    const fontSize = height / 2;
    return (
      <View style={[styles.wheelItem, { height }]}>
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
          {game.name}
        </Animated.Text>
      </View>
    );
  }
}

WheelItem.propTypes = {
  height: PropTypes.number.isRequired,
  game: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    name: PropTypes.node.isRequired,
  }),
};

export default WheelItem;
