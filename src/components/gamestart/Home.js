import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { userSelector, matchSelector } from '../../selectors';
import { retrieveMatches } from '../../actions/application';

import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';
import MatchesList from '../common/MatchesList';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
});

class Home extends Component {
  constructor(props) {
    super();

    this.onNewGamePress = this.onNewGamePress.bind(this);
    this.onMatchPress = this.onMatchPress.bind(this);

    props.dispatch(retrieveMatches());
  }

  onNewGamePress() {
    this.props.navigator.push({ name: 'pickOpponent' });
  }

  onMatchPress(matchId) {
    this.props.navigator.push({ name: 'match', matchId });
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
            {this.props.matches !== null &&
              <MatchesList
                matches={
                  this.props.matches
                    .sort((m1, m2) => m1.createdAt - m2.createdAt)
                }
                onMatchPress={this.onMatchPress}
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
  matches: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default connect(state => ({
  user: userSelector(state.userId, state),
  matches: Object.keys(state.matches).map(matchId =>
    matchSelector(matchId, state)
  ),
}))(Home);
