import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import Title from '../common/Title';
import Template from '../common/Template';
import withUser from '../common/withUser';
import UsernameInput from './UsernameInput';


import styles from './formStyles';

class FacebookUsername extends Component {
  render() {
    return (
      <Template
        header={<Title>CHOOSE A USERNAME!</Title>}
        footer={
          <View style={styles.container}>
            <UsernameInput onSuccess={this.props.onSuccess} />
          </View>
        }
      />
    );
  }
}

FacebookUsername.propTypes = {
  user: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default withUser(FacebookUsername);
