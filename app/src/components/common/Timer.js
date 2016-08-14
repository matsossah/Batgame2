import React, { Component, PropTypes } from 'react';

import Duration from './Duration';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 0,
    };

    this.updateTimer = this.updateTimer.bind(this);
    this.timeout = setTimeout(this.updateTimer, 50);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  updateTimer() {
    const timer = Date.now() - this.props.startTime;
    this.setState({ timer });
    this.timeout = setTimeout(this.updateTimer, 50);
  }

  render() {
    const { ...otherProps } = this.props;
    const { timer } = this.state;
    return (
      <Duration {...otherProps} duration={timer} />
    );
  }
}

Timer.propTypes = {
  startTime: PropTypes.number.isRequired,
};

export default Timer;
