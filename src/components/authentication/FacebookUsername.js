import React, { Component, PropTypes } from 'react';
import { View, TextInput, Alert, Image } from 'react-native';
import Parse from 'parse/react-native';
import { connect } from 'react-redux';

import Button from '../common/Button';
import Title from '../common/Title';
import Template from '../common/Template';
import I18n from '../../config/i18n';

import styles from './formStyles';

class FacebookUsername extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
    };

    this.onPress = this.onPress.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }
  onPress() {
    if (this.state.username.length < 3 || this.state.username.length > 9) {
      Alert.alert(I18n.t('username3To9Characters'));
      return;
    }
    const user = new Parse.User({ id: this.props.userId });
    user.save({
      username: this.state.username.toLowerCase(),
      hasUsername: true,
    }, {
      success: () => {
        this.props.onSuccess(user);
      },
      error: (user2, err) => {
        let message;
        switch (err.code) {
          case Parse.Error.USERNAME_TAKEN:
            message = I18n.t('usernameTaken');
            break;
          default:
            // @TODO: Find out exactly what errors can be thrown by .signUp()
            console.error(err);
            message = I18n.t('unknownError');
        }
        Alert.alert(message);
      },
    });
  }
  updateUsername(text) {
    this.setState({ username: text });
  }
  render() {
    return (
      <Template
        header={
          <View style={styles.backdropView}>
            <Title>{I18n.t('pickUsername')}</Title>
          </View>
          }
        footer={
          <View style={styles.footerContainer}>
            <View style={styles.topUsername}>
              <TextInput
                autoCorrect={false}
                style={styles.input}
                autoCapitalize="none"
                placeholder={I18n.t('username')}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                onChangeText={this.updateUsername}
                value={this.state.username}
              />
              <View style={styles.formSubmit}>
                <Button
                  text={I18n.t('go')}
                  onPress={this.onPress}
                  disabled={this.state.loading}
                />
              </View>
            </View>
            <View style={styles.bottom} />
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

export default connect(state => ({
  userId: state.application.userId,
}))(FacebookUsername);
