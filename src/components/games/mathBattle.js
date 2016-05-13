import React, {
  View,
  StyleSheet,
} from 'react-native';

const Parse = require('parse/react-native');
import Template from '../common/template';
import Title from '../common/title';
import LargeButton from '../common/largeButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  equations: {
    height: 300,
    width: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  equation: {
    height: 60,
    width: 150,
    borderRadius: 10,
    backgroundColor: '#4EB479',
  },
});

class MathBattle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topEquation: '',
      bottomEquation: '',
      score: 0,
    };
    this.onTopPress = this.onTopPress.bind(this);
    this.onBottomPress = this.onBottomPress.bind(this);
  }
  componentWillMount() {
    function randomNumber() {
      const numbers = [0, 1, 3, 4, 5, 6, 7, 8, 9];
      return (
        numbers[Math.floor(Math.random() * numbers.length)]
      );
    }
    function randomSign() {
      const signs = ['+', '-', '/', '*'];
      return (
        signs[Math.floor(Math.random() * signs.length)]
      );
    }
    const top = randomNumber() + randomSign + randomNumber() + randomSign + randomNumber();
    const bottom = randomNumber() + randomSign + randomNumber() + randomSign + randomNumber();

    this.setState({
      topEquation: top,
      bottomEquation: bottom,
    });
  }
  onTopPress() {
  }
  onBottomPress() {
  }
  render() {
    return (
      <Template
        // pass the title in uppercase if needed
        header={<Title>{this.state.score} points</Title>}
        footer={
          <View style={styles.container}>
            <View style={styles.equations}>
              <LargeButton
                style={styles.equation}
                buttonText={this.state.topEquation}
                onPress={this.onTopPress}
                underlayColor="#4EB479"
              />
              <LargeButton
                style={styles.equation}
                buttonText={this.state.bottomEquation}
                onPress={this.onBottomPress}
                underlayColor="#4EB479"
              />
            </View>
          </View>
        }
      />
    );
  }
}

MathBattle.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};

module.exports = MathBattle;
