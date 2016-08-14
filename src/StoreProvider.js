import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import PushNotification from 'react-native-push-notification';
import I18n from 'react-native-i18n';

import { registerInstallation } from './actions/application';
import reducer from './reducers';
import Main from './Main';

// import codePush from 'react-native-code-push';

const logger = createLogger();

const applicationStore = createStore(
  reducer,
  __DEV__ ? applyMiddleware(thunk, logger) : applyMiddleware(thunk)
);

PushNotification.configure({
  onRegister(token) {
    applicationStore.dispatch(registerInstallation(token.os, token.token, I18n.locale));
  },

  onNotification(notification) {
    console.log('NOTIFICATION:', notification);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
});

class StoreProvider extends Component {

  // componentDidMount() {
  //   codePush.sync();
  // }

  render() {
    return (
      <Provider store={applicationStore}>
        <Main />
      </Provider>
    );
  }
}

export default StoreProvider;
