import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';

import { vmin, vmax } from './../services/viewport';


class Invisible extends Component {
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
        <Text style={{ width: this.props.width * vmin, height: this.props.height * vmax }} />
      </View>
    );
  }
}

Invisible.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Invisible;
