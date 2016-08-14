import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';


import { vmin, vmax } from './../services/viewport';


class StartAgain extends Component {
  constructor() {
    super();

    this.pressMe = this.pressMe.bind(this);
  }

  pressMe() {
    this.props.onStartAgain();
  }

  render() {
    return (
      <View style={{ position: 'absolute', left: 35 * vmin, top: 40 * vmax }}>
        <TouchableOpacity activeOpacity={1} onPress={this.pressMe}>
          <Image
            resizeMode="stretch"
            source={require('./../images/flappybird_play.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

StartAgain.propTypes = {
  onStartAgain: PropTypes.func,
};

export default StartAgain;
