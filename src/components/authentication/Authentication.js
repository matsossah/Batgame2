import React, { Component, PropTypes } from 'react';
import { Alert, StyleSheet, Image, View } from 'react-native';

import Tabs from '../common/Tabs';
import Title from '../common/Title';
import Template from '../common/Template';
import Signup from './Signup';
import Signin from './Signin';
import FacebookLogin from './FacebookLogin';
import I18n from '../../config/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: null,
    height: null,
  },
  backdropView: {
    backgroundColor: 'rgba(0,0,0,0)',
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
    return (
      <Template
        // pass the title in uppercase
        header={
          <Image source={require('../../assets/header2.png')} style={styles.container} resizeMode={Image.resizeMode.stretch}>
            <View style={styles.backdropView}>
              <Title>SPEEDY BRAIN</Title>
            </View>
          </Image>
        }
        separator={this.renderFacebookLogin()}
        footer={
          <Image source={require('../../assets/background2.png')} style={styles.container} resizeMode={Image.resizeMode.stretch}>
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
          </Image>
        }
      />
    );
  }
}

Authentication.propTypes = {
  onAuthenticated: PropTypes.func.isRequired,
};

export default Authentication;
