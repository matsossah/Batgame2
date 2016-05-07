import React, {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import Tabs from '../common/tabs';
import Signup from './signup';
import Signin from './signin';

class Authentication extends React.Component {
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
      <Tabs
        tabs={[
          {
            title: 'Signup',
            tabRender: this.renderSignupForm,
          },
          {
            title: 'Login',
            tabRender: this.renderSigninForm,
          },
        ]}
      />
    );
  }
}

Authentication.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};

module.exports = Authentication;