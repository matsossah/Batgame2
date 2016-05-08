import React, {
  Component,
  PropTypes,
} from 'react-native';

import Tabs from '../common/tabs';
import Title from '../common/title';
import Template from '../common/template';
import Signup from './signup';
import Signin from './signin';

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
        footer={<Tabs
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
        />}
      />
    );
  }
}

Authentication.propTypes = {
  navigator: PropTypes.object.isRequired,
};

module.exports = Authentication;
