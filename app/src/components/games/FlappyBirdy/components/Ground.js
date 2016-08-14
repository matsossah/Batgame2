import React, { Component, PropTypes } from 'react';
import { View, Image } from 'react-native';

import { vmin, vmax } from './../services/viewport';


class Ground extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  componentWillUnMount() {
  }

  render() {
    return (
      <View style={{ position: 'absolute', left: this.props.x, top: this.props.y * vmax }}>
        <Image
          resizeMode="stretch" source={require('./../images/flappybird-bg-brow.png')}
          style={{ width: this.props.width * vmin, height: this.props.height * vmax }}
        />
      </View>
    );
  }
}

Ground.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Ground;
