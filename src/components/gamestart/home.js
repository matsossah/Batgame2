import React, {
  ScrollView,
  StyleSheet,
} from 'react-native';

const Parse = require('parse/react-native');
import Template from '../common/template';
import Title from '../common/title';
import LargeButton from '../common/largeButton';
import GamesList from '../common/gamesList';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.onNewGamePress = this.onNewGamePress.bind(this);
  }
  componentWillMount() {
    Parse.User.currentAsync()
      .then((user) => { this.setState({ user: user }); });
  }
  onNewGamePress() {
    this.props.navigator.push({ name: 'pick_opponent' });
  }
  render() {
    // let username = this.state.user.get('username');
    return (
      <Template
        // pass the title in uppercase
        header={<Title>START A GAME!</Title>}
        footer={
          <ScrollView style={styles.scrollView}>
            <LargeButton
              buttonText="NEW GAME"
              onPress={this.onNewGamePress}
              underlayColor="#4EB479"
            />
            <GamesList
              games={[
                {
                  userScore: 5,
                  opponent: 'Mumu',
                  opponentScore: 3,
                  isFinished: false,
                },
                {
                  userScore: 3,
                  opponent: 'Jess',
                  opponentScore: 4,
                  isFinished: false,
                },
              ]}
            />
          </ScrollView>
        }
      />
    );
  }
}

Home.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};

module.exports = Home;
