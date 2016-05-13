import React, { Component, PropTypes } from 'react-native';
import moment from 'moment';

import Duration from './duration';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 0,
    };

    this.updateTimer = this.updateTimer.bind(this);
    this.timeout = setTimeout(this.updateTimer, 10);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  updateTimer() {
    const timer = Date.now() - this.props.startTime;
    this.setState({ timer });
    this.timeout = setTimeout(this.updateTimer, 10);
  }

  render() {
    const { ...otherProps } = this.props;
    const { timer } = this.state;
    const time = moment.duration(timer, 'ms');
    return (
      <Duration {...otherProps} duration={time} />
    );
  }
}

Timer.propTypes = {
  startTime: PropTypes.number.isRequired,
};

export default Timer;
