import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Parse from 'parse/react-native';

import withUser from '../common/withUser';
import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';
import MatchesList from '../common/MatchesList';
import { normalizeMatch } from '../../normalize';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
});

const Match = Parse.Object.extend('Match');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: null,
    };
    this.onNewGamePress = this.onNewGamePress.bind(this);
  }
  componentDidMount() {
    const { user } = this.props;
    new Parse.Query('Match')
      .equalTo('participants', user)
      .include('participants')
      .include('rounds')
      .include('rounds.games')
      .include('rounds.games.scores')
      .find()
      .then(matches => {
        this.setState({ matches });
      })
      .catch(e => {
        // @TODO: handle error
        console.error(e);
      });
  }
  onNewGamePress() {
    this.props.navigator.push({ name: 'pickOpponent' });
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
            {this.state.matches !== null &&
              <MatchesList
                matches={this.state.matches.map(normalizeMatch)}
              />
            }
          </ScrollView>
        }
      />
    );
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default withUser(Home);
