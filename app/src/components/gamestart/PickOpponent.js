import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Clipboard, ToastAndroid, AlertIOS, Platform } from 'react-native';
import { connect } from 'react-redux';

import { joinRandomMatch } from '../../actions/application';
import { popModals, gotoSearchScreen } from '../../actions/navigation';
import { userSelector } from 'shared/selectors';
import Template from '../common/Template';
import Title from '../common/Title';
import LargeButton from '../common/LargeButton';
import I18n from '../../config/i18n';
import Fabric from 'react-native-fabric';
// import branch from 'react-native-branch'
import Share, { ShareSheet, Button } from 'react-native-share';

const { Answers } = Fabric;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  footer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  empty: {
    flex: 1,
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
    width: 100,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    backgroundColor: '#34485E',
  },
  backBox: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  titleBox: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  back: {
    fontSize: 50,
    fontFamily: 'chalkduster',
    fontWeight: 'bold',
    color: '#FFD664',
  },
});

const fbShare = {
  title: 'Speedy Brain!',
  message: '',
  url: 'https://www.youtube.com/watch?v=hOHN2qNTYr8',
  subject: I18n.t('whosBest'), //  for email
};

const shareOptions = {
  title: 'Speedy Brain!',
  message: '',
  url: 'http://bit.ly/2bOKNxt',
  subject: I18n.t('whosBest'), //  for email
};

class PickOpponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.onInvitePress = this.onInvitePress.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onRandomPress = this.onRandomPress.bind(this);
    this.onSearchPress = this.onSearchPress.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }
  onInvitePress() {
    Answers.logCustom('Invite pressed');
    this.setState({ visible: true });
  }
  onCancel() {
    this.setState({ visible: false });
  }
  onRandomPress() {
    // @TODO: show loader or move into another view while looking for a match
    Answers.logCustom('random pressed');
    this.props.dispatch(joinRandomMatch());
  }
  onSearchPress() {
    Answers.logCustom('Search by username');
    this.props.dispatch(gotoSearchScreen());
  }
  onBackPress() {
    Answers.logCustom('PickOpponent Back');
    this.props.dispatch(popModals());
  }
  render() {
    return (
      <Template
        // pass the title in uppercase
        header={
          <TouchableOpacity
            onPress={this.onBackPress}
            style={styles.header}
          >
            <View style={styles.header}>
              <View style={styles.backBox}>
                <View style={styles.backButton}>
                  <Text style={styles.back}>{'<'}</Text>
                </View>
              </View>
              <View style={styles.titleBox}>
                <Title>
                  {I18n.t('pickVictim')}
                </Title>
              </View>
            </View>
          </TouchableOpacity>
        }
        footer={
          <View style={styles.footer}>
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
              buttonText={I18n.t('inviteFriends')}
              onPress={this.onInvitePress}
              underlayColor="#3498DB"
            />
            <ShareSheet
              visible={this.state.visible}
              onCancel={this.onCancel}
            >
              <Button
                iconSrc={require('../../assets/twitter.png')}
                onPress={() => {
                  shareOptions.message =
                  I18n.t('launchChallenge')
                  + '"'
                  + this.props.user.username
                  + '"'
                  + '!\n\n👇 👇 👇 👇 👇 👇 👇\n';
                  Answers.logCustom('Twitter Invite');
                  this.onCancel();
                  setTimeout(() => {
                    Share.shareSingle(Object.assign(shareOptions, {
                      social: 'twitter',
                    }));
                  }, 300);
                }}
              >
               Twitter
              </Button>
              <Button
                iconSrc={require('../../assets/facebook.png')}
                onPress={() => {
                  Answers.logCustom('FB Invite');
                  this.onCancel();
                  setTimeout(() => {
                    Share.shareSingle(Object.assign(fbShare, {
                      social: 'facebook',
                    }));
                  }, 300);
                }}
              >
               Facebook
              </Button>
              <Button
                iconSrc={require('../../assets/whatsapp.png')}
                onPress={() => {
                  Answers.logCustom('Whatsapp Invite');
                  shareOptions.message =
                  I18n.t('launchChallenge2')
                  + '"'
                  + this.props.user.username
                  + '"'
                  + '!\n\n👇 👇 👇 👇 👇 👇 👇\n';
                  this.onCancel();
                  setTimeout(() => {
                    Share.shareSingle(Object.assign(shareOptions, {
                      social: 'whatsapp',
                    }));
                  }, 300);
                }}
              >
               Whatsapp
              </Button>
              <Button
                iconSrc={require('../../assets/email.png')}
                onPress={() => {
                  shareOptions.message =
                  I18n.t('launchChallenge2')
                  + '"'
                  + this.props.user.username
                  + '"'
                  + '!\n\n👇 👇 👇 👇 👇 👇 👇\n';
                  Answers.logCustom('Email Invite');
                  this.onCancel();
                  setTimeout(() => {
                    Share.shareSingle(Object.assign(shareOptions, {
                      social: 'email',
                    }));
                  }, 300);
                }}
              >
               Email
              </Button>
              <Button
                iconSrc={require('../../assets/clipboard.png')}
                onPress={() => {
                  Answers.logCustom('Link Copied');
                  this.onCancel();
                  setTimeout(() => {
                    if (typeof shareOptions.url !== undefined) {
                      Clipboard.setString(shareOptions.url);
                      if (Platform.OS === 'android') {
                        ToastAndroid.show(I18n.t('linksCopied'), ToastAndroid.SHORT);
                      } else if (Platform.OS === 'ios') {
                        AlertIOS.alert(I18n.t('linksCopied'));
                      }
                    }
                  }, 300);
                }}
              >
                {I18n.t('copyLink')}
              </Button>
            </ShareSheet>
          </View>
        }
      />
    );
  }
}

PickOpponent.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  user: userSelector(state.application.userId, state),
}))(PickOpponent);
