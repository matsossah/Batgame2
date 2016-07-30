import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { userSelector, matchSelector } from '../../selectors';
import {
  retrieveMatches,
  joinRandomMatch,
} from '../../actions/application';
import { gotoPickOpponent, gotoMatch } from '../../actions/navigation';
import I18n from '../../config/i18n';

import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';
import MatchesList from '../match/MatchesList';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 60,
    marginBottom: 20,
  },
  newGame: {
    borderColor: '#4EB479',
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
    // Option 1 to go to pick opponent from FB, random or username
    this.props.dispatch(gotoPickOpponent());

    // Option 2 to start a game with a random opponent right away.
    // this.props.dispatch(joinRandomMatch());
  }

  onMatchPress(matchId) {
    this.props.dispatch(gotoMatch(matchId));
  }

  render() {
    return (
      <Template
        // pass the title in uppercase
        header={<Title style={styles.title}>{I18n.t('start')}</Title>}
        footer={
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            initialListSize={1}
            pageSize={1}
            scrollRenderAheadDistance={1}
          >
            <LargeButton
              buttonText={I18n.t('newGame')}
              onPress={this.onNewGamePress}
              underlayColor="#4EB479"
              style={styles.newGame}
              fontSize={30}
            />
            {this.props.matches !== null &&
              <MatchesList
                matches={this.props.matches}
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
};

export default connect(state => ({
  user: userSelector(state.application.userId, state),
  matches: Object.keys(state.application.matches).map(matchId =>
    matchSelector(matchId, state)
  ),
}))(Home);
