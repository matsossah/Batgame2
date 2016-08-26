import React, { Component, PropTypes } from 'react';
import { Alert, TouchableWithoutFeedback, StyleSheet, View, Platform } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Tabs from '../common/Tabs';
import Title from '../common/Title';
import Template from '../common/Template';
import Signup from './Signup';
import Signin from './Signin';
import FacebookLogin from './FacebookLogin';
import I18n from '../../config/i18n';

const dismissKeyboard = require('dismissKeyboard')

const styles = StyleSheet.create({
  separator: {
    flex: 7,
    backgroundColor: '#2C3D50',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    backgroundColor: '#2C3D50',
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

class Authentication extends Component {
  constructor() {
    super();
    this.onSignin = this.onSignin.bind(this);
    this.onError = this.onError.bind(this);
    this.renderFacebookLogin = this.renderFacebookLogin.bind(this);
    this.renderSignupForm = this.renderSignupForm.bind(this);
    this.renderSigninForm = this.renderSigninForm.bind(this);
  }
  onSignin(user) {
    this.props.onAuthenticated(user);
  }
  onError(message) {
    Alert.alert(message);
  }
  renderFacebookLogin() {
    return (
      <FacebookLogin
        onLogin={this.onSignin}
        onError={this.onError}
      />
    );
  }
  renderSignupForm() {
    return (
      <Signup
        onSignup={this.onSignin}
        onError={this.onError}
      />
    );
  }
  renderSigninForm() {
    return (
      <Signin
        onSignin={this.onSignin}
        onError={this.onError}
      />
    );
  }
  render() {
    let separatorStyle;
    let headerStyle;
    if (Platform.OS === 'android') {
      separatorStyle = styles.separator;
      headerStyle = styles.headerStyle;
    }
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={styles.container}>
          <Template
            // pass the title in uppercase
            header={
              <Title>SPEEDY BRAIN</Title>
            }
            separator={this.renderFacebookLogin()}
            footer={
              <Tabs
                tabs={[
                  {
                    title: I18n.t('signup'),
                    tabRender: this.renderSignupForm,
                    underlayColor: 'transparent',
                  },
                  {
                    title: I18n.t('login'),
                    tabRender: this.renderSigninForm,
                    underlayColor: 'transparent',
                  },
                ]}
              />
            }
            separatorStyle={separatorStyle}
            headerStyle={headerStyle}
            footerStyle={styles.footerStyle}
          />
          {Platform.OS === 'ios' && <KeyboardSpacer />}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Authentication.propTypes = {
  onAuthenticated: PropTypes.func.isRequired,
};

export default Authentication;
