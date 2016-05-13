import React, {
  View,
  StyleSheet,
} from 'react-native';

const formatTime = require('minutes-seconds-milliseconds');
const Parse = require('parse/react-native');
import Template from '../common/template';
import Title from '../common/title';
import LargeButton from '../common/largeButton';

const styles = StyleSheet.create({
  stoplight: {
    height: 250,
    width: 100,
    borderRadius: 8,
    flexDirection: 'column',
    borderColor: '#583B67',
    borderWidth: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redlight: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: '#E74C3C',
    borderWidth: 5,
  },
  orangelight: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: '#E67E2C',
    borderWidth: 5,
  },
  greenlight: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: '#4EB479',
    borderWidth: 5,
  },
  newGame: {
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#FFD664',
  },
});

class Stoplight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: 0,
      startTime: null,
      running: false,
      score: 0,
      color: '',
    };
    this.onGoPress = this.onGoPress.bind(this);
  }
  componentWillMount() {
    this.setState({ startTime: new Date() });

    this.interval = setInterval(() => {
      const randomTime = Math.random() * (10000 - 5000) + 5000;

      switch (this.state.color) {
        case '':
        // set to red
          if (this.state.timeElapsed > 1000) {
            this.setState({ color: '#E74C3C' });
          }
          break;
        case '#E74C3C':
        // set to orange
          if (this.state.timeElapsed > 2000) {
            this.setState({ color: '#E67E2C' });
          }
          break;
        case '#E67E2C':
        // set to green
          if (this.state.timeElapsed > randomTime) {
            this.setState({
              color: '#4EB479',
              startTime: new Date(),
              running: true,
            });
          }
          break;
        default:
      }
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
      });
    }, 10);
  }
  onGoPress() {
    clearInterval(this.interval);
    if (this.state.running) {
      return (
        this.setState({
          score: this.state.timeElapsed,
        })
      );
    }
    return (
      this.setState({
        score: 1000,
      })
    );
  }
  render() {
    return (
      <Template
        // pass the title in uppercase
        header={<Title>{this.state.running ?
          formatTime(this.state.timeElapsed) :
          formatTime(this.state.score)}
        </Title>}
        footer={
          <View style={styles.container}>
            <View style={styles.stoplight}>
              <View
                style={[styles.redlight,
                { backgroundColor: this.state.color === '#E74C3C' ?
                this.state.color : 'transparent' }]}
              />
              <View
                style={[styles.orangelight,
                { backgroundColor: this.state.color === '#E67E2C' ?
                this.state.color : 'transparent' }]}
              />
              <View
                style={[styles.greenlight,
                { backgroundColor: this.state.color === '#4EB479' ?
                this.state.color : 'transparent' }]}
              />
            </View>
            <LargeButton
              style={styles.newGame}
              buttonText="GO!"
              onPress={this.onGoPress}
              underlayColor="#FFD664"
            />
          </View>
        }
      />
    );
  }
}

Stoplight.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};

module.exports = Stoplight;
