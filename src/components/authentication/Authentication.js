import React, { Component, PropTypes } from 'react';
import { LoginButton } from 'react-native-fbsdk';

import Tabs from '../common/Tabs';
import Title from '../common/Title';
import Template from '../common/Template';
import Signup from './Signup';
import Signin from './Signin';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.renderSignupForm = this.renderSignupForm.bind(this);
    this.renderSigninForm = this.renderSigninForm.bind(this);
  }
  renderSignupForm() {
    return (
      <Signup navigator={this.props.navigator} />
    );
  }
  renderSigninForm() {
    return (
      <Signin navigator={this.props.navigator} />
    );
  }
  render() {
    return (
      <Template
        // pass the title in uppercase
        header={<Title>BRAINING</Title>}
        separator={
          <LoginButton
            publishPermissions={['publish_actions']}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert('login has error: ' + result.error);
                } else if (result.isCancelled) {
                  alert('login is cancelled.');
                } else {
                  alert('login has finished with permissions: ' + result.grantedPermissions);
                }
              }
            }
            onLogoutFinished={() => alert('logout.')}
          />
        }
        footer={<Tabs
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
        />}
      />
    );
  }
}

Authentication.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default Authentication;
