import React, { StyleSheet, Component, PropTypes, Text } from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  countdown: {

  },
});

function formatCountdown(d) {
  return `${d.minutes()}:${d.seconds()}.${Math.round(d.milliseconds() / 10)}`;
}

export default function createCountdownGame(Composed) {
  class CountdownGame extends Component {
    constructor() {
      super();

      this.state = {
        countdown: 0,
      };

      this.startTime = Date.now();
      this.updateCountDown = this.updateCountDown.bind(this);
      this.timeout = setTimeout(this.updateCountDown, 10);
    }

    componentWillUnmount() {
      clearTimeout(this.timeout);
    }

    updateCountDown() {
      const countdown = Date.now() - this.startTime;
      if (countdown > this.props.duration * 1000) {
        this.props.onFailure();
      } else {
        this.setState({ countdown });
      }
      this.timeout = setTimeout(this.updateCountDown, 10);
    }

    render() {
      const { duration, header, ...otherProps } = this.props;
      const { countdown } = this.state;
      const timeLeft = moment
        .duration(duration, 's')
        .subtract(countdown, 'ms');
      return (
        <Composed
          {...otherProps}
          header={[
            <Text style={styles.countdown}>
              {formatCountdown(timeLeft)}
            </Text>,
          ].concat(header)}
        />
      );
    }
  }

  CountdownGame.propTypes = {
    duration: PropTypes.number.isRequired,
    onFailure: PropTypes.func.isRequired,
    header: PropTypes.node,
  };

  return CountdownGame;
}
