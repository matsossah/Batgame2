import React, { Component, PropTypes } from 'react';
import { Alert, StyleSheet, Platform } from 'react-native';

import Tabs from '../common/Tabs';
import Title from '../common/Title';
import Template from '../common/Template';
import Signup from './Signup';
import Signin from './Signin';
import FacebookLogin from './FacebookLogin';
import I18n from '../../config/i18n';

const styles = StyleSheet.create({
  separator: {
    flex: 7,
    backgroundColor: '#2C3D50',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    backgroundColor: '#2C3D50',
  },
  footer: {
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
    let style;
    if (Platform.OS === 'android') {
      separatorStyle = styles.separator;
      style = styles.back;
    }
    return (
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
        style={style}
        footerStyle={styles.footer}
      />
    );
  }
}

Authentication.propTypes = {
  onAuthenticated: PropTypes.func.isRequired,
};

export default Authentication;
