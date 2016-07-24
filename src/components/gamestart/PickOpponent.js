import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { joinRandomMatch } from '../../actions/application';
import { popModals, gotoSearchScreen } from '../../actions/navigation';

import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';
import I18n from '../../config/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topFooter: {
    flex: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomFooter: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  empty: {
    flex: 1,
  },
  buttonsView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 8,
  },
  buttonTextStyle: {
    fontSize: 14,
  },
  byUsername: {
    height: 90,
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#77c2f4',
  },
  random: {
    height: 90,
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498DB',
  },
  facebook: {
    height: 90,
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b5998',
  },
  backButton: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3D50',
  },
  backBox: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  back: {
    fontSize: 50,
    fontFamily: 'chalkduster',
    fontWeight: 'bold',
    color: '#FFD664',
  },
});

class PickOpponent extends Component {
  constructor(props) {
    super(props);
    this.onFacebookPress = this.onFacebookPress.bind(this);
    this.onRandomPress = this.onRandomPress.bind(this);
    this.onSearchPress = this.onSearchPress.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }
  onFacebookPress() {
  }
  onRandomPress() {
    // @TODO: show loader or move into another view while looking for a match
    this.props.dispatch(joinRandomMatch());
  }
  onSearchPress() {
    this.props.dispatch(gotoSearchScreen());
  }
  onBackPress() {
    this.props.dispatch(popModals());
  }
  render() {
    return (
      <Template
        // pass the title in uppercase
        header={<Title>{I18n.t('pickVictim')}</Title>}
        footer={
          <View style={styles.container}>
            <View style={styles.topFooter}>
              <View style={styles.buttonsView}>
                <LargeButton
                  style={styles.byUsername}
                  buttonTextStyle={styles.buttonTextStyle}
                  buttonText={I18n.t('searchByUsername')}
                  onPress={this.onSearchPress}
                  underlayColor="#583B67"
                />
                <LargeButton
                  style={styles.random}
                  buttonTextStyle={styles.buttonTextStyle}
                  buttonText={I18n.t('randomOpponent')}
                  onPress={this.onRandomPress}
                  underlayColor="#E67E2C"
                />
                <LargeButton
                  style={styles.facebook}
                  buttonTextStyle={styles.buttonTextStyle}
                  buttonText={I18n.t('inviteFBFriends')}
                  onPress={this.onFacebookPress}
                  underlayColor="#3498DB"
                  disabled
                />
              </View>
            </View>
            <View style={styles.bottomFooter}>
              <View style={styles.backBox}>
                <TouchableHighlight
                  onPress={this.onBackPress}
                  underlayColor="transparent"
                >
                  <View style={styles.backButton}>
                    <Text style={styles.back}>{'<'}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        }
      />
    );
  }
}

PickOpponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(PickOpponent);
