import React, { Component, PropTypes, Text } from 'react-native';
import moment from 'moment';

import formatDuration from '../../formatDuration';

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
    const timeLeft = moment.duration(timer, 'ms');
    return (
      <Text {...otherProps}>
        {formatDuration(timeLeft)}
      </Text>
    );
  }
}

Timer.propTypes = {
  startTime: PropTypes.number.isRequired,
};

export default Timer;
