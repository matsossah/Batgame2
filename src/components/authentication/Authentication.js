import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-native';

import Tabs from '../common/Tabs';
import Title from '../common/Title';
import Template from '../common/Template';
import Signup from './Signup';
import Signin from './Signin';
import FacebookLogin from './FacebookLogin';

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
        header={<Title>BRAINING</Title>}
        separator={this.renderFacebookLogin()}
        footer={
          <Tabs
            tabs={[
              {
                title: 'Signup',
                tabRender: this.renderSignupForm,
                underlayColor: 'transparent',
              },
              {
                title: 'Login',
                tabRender: this.renderSigninForm,
                underlayColor: 'transparent',
              },
            ]}
          />
        }
      />
    );
  }
}

Authentication.propTypes = {
  onAuthenticated: PropTypes.func.isRequired,
};

export default Authentication;
