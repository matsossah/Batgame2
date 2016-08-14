import React, { Component, PropTypes } from 'react';

import Duration from './Duration';

class Countdown extends Component {
  constructor() {
    super();

    this.state = {
      countdown: 0,
    };

    this.updateCountdown = this.updateCountdown.bind(this);
    this.timeout = setTimeout(this.updateCountdown, 10);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  updateCountdown() {
    // We need to set the timeout here since `onComplete` might trigger a
    // synchronous unmounting of the component, which means we need
    // `this.timeout` to be updated when we clear it.
    this.timeout = setTimeout(this.updateCountdown, 10);
    const countdown = Date.now() - this.props.startTime;
    if (countdown > this.props.duration * 1000) {
      this.props.onComplete();
    } else {
      this.setState({ countdown });
    }
  }

  render() {
    const { duration, ...otherProps } = this.props;
    const { countdown } = this.state;
    const timeLeft = duration * 1000 - countdown;
    return (
      <Duration {...otherProps} duration={timeLeft} />
    );
  }
}

Countdown.propTypes = {
  startTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  textStyle: PropTypes.any,
};

export default Countdown;
