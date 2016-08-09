import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import omit from 'lodash/omit';

const styles = StyleSheet.create({
  heart: {
    // Otherwise whenever a heart scales enough to move over another, its
    // background shows.
    backgroundColor: 'transparent',
  },
});

class Heart extends Component {
  constructor(props) {
    super();

    this.pop = new Animated.Value(props.full ? 0 : 1);

    this.onPopUpdate = this.onPopUpdate.bind(this);

    this.state = {
      pop: this.pop,
      full: props.full,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.full && !this.props.full) {
      // @TODO: Add a cooler "tada" animation
      Animated.timing(this.state.pop, {
        toValue: 1,
        duration: 300,
      }).start();
      this.pop.addListener(this.onPopUpdate);
    } else if (!prevProps.full && this.props.full) {
      Animated.timing(this.state.pop, {
        toValue: 0,
        duration: 300,
      }).start();
      this.pop.addListener(this.onPopUpdate);
    }
  }

  onPopUpdate({ value }) {
    if (this.state.full && value > 0.5) {
      this.setState({
        full: false,
      });
      this.pop.removeListener(this.onPopUpdate);
    } else if (!this.state.full && value < 0.5) {
      this.setState({
        full: true,
      });
      this.pop.removeListener(this.onPopUpdate);
    }
  }

  render() {
    return (
      <Animated.View
        {...omit(this.props, 'full', 'style')}
        style={[
          styles.heart,
          {
            transform: [
              {
                scale: this.state.pop.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 1.2, 1],
                }),
              },
            ],
          },
        ].concat(this.props.style)}
      >
        <Icon name={this.state.full ? 'heart' : 'heart-o'} size={30} color="#df4c40" />
      </Animated.View>
    );
  }
}

Heart.propTypes = {
  style: PropTypes.any,
  full: PropTypes.bool.isRequired,
};

export default Heart;
