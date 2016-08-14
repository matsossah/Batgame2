import React, { Component, PropTypes } from 'react';
import { View, Image } from 'react-native';

import { vmin } from './../services/viewport';


class Bird extends Component {

  constructor() {
    super();
    this.state = {
      margin: 0,
    };

    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
  }

  componentDidMount() {
    if (this.props.animate) {
      this.startAnimation();
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.animate !== nextProps.animate) {
      if (nextProps.animate) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    }
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  startAnimation() {
    if (this.animating) {
      return;
    }
    this.intervalId = setInterval(() => {
      this.setState({
        margin: (this.state.margin + 10) % 30,
      });
    }, 100);
    this.animating = true;
  }

  stopAnimation() {
    if (this.animating) {
      clearInterval(this.intervalId);
      this.animating = false;
    }
  }

  render() {
    const width = 10 * vmin;
    const height = 10 * vmin;

    return (
      <View
        style={{
          position: 'absolute',
          left: this.props.x,
          top: this.props.y,
          width,
          height,
          overflow: 'hidden',
          transform: [{ rotate: this.props.rotation + 'deg' }],
        }}
      >
        <View style={{ marginTop: -this.state.margin * vmin }}>
          <Image
            source={require('./../images/bird1.png')}
            style={{ width: 10 * vmin, height: 10 * vmin }}
          />
          <Image
            source={require('./../images/bird2.png')}
            style={{ width: 10 * vmin, height: 10 * vmin }}
          />
          <Image
            source={require('./../images/bird3.png')}
            style={{ width: 10 * vmin, height: 10 * vmin }}
          />
        </View>
      </View>
    );
  }
}

Bird.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  rotation: PropTypes.number,
  animate: PropTypes.number,
};

export default Bird;
