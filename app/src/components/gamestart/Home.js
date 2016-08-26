import React, { Component, PropTypes } from 'react';
import { View, Alert, Text, TouchableHighlight, ScrollView, StyleSheet, RefreshControl, AppState, Platform } from 'react-native';
import { connect } from 'react-redux';

import { userSelector, matchSelector } from 'shared/selectors';
import {
  retrieveMatches,
  userLogOut,
} from '../../actions/application';
import { gotoPickOpponent, gotoMatch } from '../../actions/navigation';
import I18n from '../../config/i18n';
import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';
import MatchesList from '../match/MatchesList';
import Fabric from 'react-native-fabric';

const { Answers } = Fabric;
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginTop: 60,
    marginBottom: 20,
  },
  newGame: {
    borderColor: '#4EB479',
    width: 270,
  },
  newGameText: {
    fontSize: 24,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  logoutBox: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flex: 3,
  },
  titleBox: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  logout: {
    paddingLeft: 10,
    fontSize: 20,
  },
  userInfo: {
    fontSize: 16,
    fontFamily: 'chalkduster',
    color: '#dfdfdf',
    paddingRight: 10,
    paddingLeft: 5,
    paddingBottom: 2,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };

    this.onNewGamePress = this.onNewGamePress.bind(this);
    this.onMatchPress = this.onMatchPress.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onAppStateChange = this.onAppStateChange.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.onAppStateChange);

    this.retrieveMatches();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onAppStateChange);
  }

  onAppStateChange(appState) {
    if (appState === 'active') {
      this.retrieveMatches();
    }
  }

  onNewGamePress() {
    // Option 1 to go to pick opponent from FB, random or username
    this.props.dispatch(gotoPickOpponent());
    Answers.logCustom('new game pressed');

    // Option 2 to start a game with a random opponent right away.
    // this.props.dispatch(joinRandomMatch());
  }

  onMatchPress(matchId) {
    Answers.logCustom('Match pressed');
    this.props.dispatch(gotoMatch(matchId));
  }

  onRefresh() {
    Answers.logCustom('Refresh Pulled');
    this.retrieveMatches();
  }

  onLogoutPress() {
    Answers.logCustom('logout Pressed');
    Alert.alert(
      I18n.t('logout'),
      '',
      [
        { text: I18n.t('staying'), onPress: () => Answers.logCustom('logout cancelled'), style: 'cancel' },
        { text: I18n.t('smallYes'), onPress: this.logUserOut },
      ]
    );
  }

  retrieveMatches() {
    this.setState({ refreshing: true });
    this.props.dispatch(retrieveMatches())
      .then(() => {
        this.setState({
          refreshing: false,
        });
      })
      .catch(e => {
        // @TODO: handle error
        console.error(e);
      });
  }

  logUserOut() {
    Answers.logCustom('logout successful');
    this.props.dispatch(userLogOut());
  }

  render() {
    return (
      <Template
        // pass the title in uppercase
        header={
          <View style={styles.header}>
            <TouchableHighlight
              onPress={this.onLogoutPress}
              underlayColor="transparent"
              style={styles.logoutBox}
            >
              <View style={styles.logoutBox}>
                <Text style={styles.logout}>{(Platform.OS === 'ios') ? '⚙' : '🚪'}</Text>
                <Text style={styles.userInfo}>{this.props.user.username}</Text>
              </View>
            </TouchableHighlight>
            <View style={styles.titleBox}>
              <Title>
                {I18n.t('start')}
              </Title>
            </View>
          </View>
        }
        footer={
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                title={I18n.t('loading')}
                tintColor="#fc8f55"
                titleColor="#fc8f55"
                backgroundColor="transparent"
              />
            }
          >
            <LargeButton
              buttonText={I18n.t('newGame')}
              onPress={this.onNewGamePress}
              underlayColor="#4EB479"
              style={styles.newGame}
              buttonTextStyle={styles.newGameText}
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
