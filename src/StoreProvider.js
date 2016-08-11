import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers';
import Main from './Main';

// import codePush from 'react-native-code-push';

const logger = createLogger();

const applicationStore = createStore(
  reducer,
  __DEV__ ? applyMiddleware(thunk, logger) : applyMiddleware(thunk)
);

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
