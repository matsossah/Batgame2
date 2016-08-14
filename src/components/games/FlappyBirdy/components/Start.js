import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';


import { vmin, vmax } from './../services/viewport';


class Start extends Component {
  constructor() {
    super();

    this.pressMe = this.pressMe.bind(this);
  }

  pressMe() {
    this.props.onStart();
  }

  render() {
    return (
      <View style={{ position: 'absolute', left: 27 * vmin, top: 30 * vmax }}>
        <TouchableOpacity activeOpacity={1} onPress={this.pressMe} >
          <Image
            resizeMode="stretch"
            style={{ marginLeft: 26 }}
            source={require('./../images/flappybird-tab.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

Start.propTypes = {
  onStart: PropTypes.func,
};

export default Start;
