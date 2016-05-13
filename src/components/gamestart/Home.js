import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Parse from 'parse/react-native';

import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';
import GamesList from '../common/GamesList';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.onNewGamePress = this.onNewGamePress.bind(this);
  }
  componentWillMount() {
    Parse.User.currentAsync()
      .then((user) => { this.setState({ user }); });
  }
  onNewGamePress() {
    this.props.navigator.push({ name: 'pick_opponent' });
  }
  render() {
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
  navigator: PropTypes.object.isRequired,
};

export default Home;
