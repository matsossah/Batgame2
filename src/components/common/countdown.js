import React, { Component, PropTypes } from 'react-native';
import moment from 'moment';

import Duration from './duration';

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
    const countdown = Date.now() - this.props.startTime;
    if (countdown > this.props.duration * 1000) {
      this.props.onComplete();
    } else {
      this.setState({ countdown });
    }
    this.timeout = setTimeout(this.updateCountdown, 10);
  }

  render() {
    const { duration, ...otherProps } = this.props;
    const { countdown } = this.state;
    const timeLeft = moment
      .duration(duration, 's')
      .subtract(countdown, 'ms');
    return (
      <Duration {...otherProps} duration={timeLeft} />
    );
  }
}

Countdown.propTypes = {
  startTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Countdown;
