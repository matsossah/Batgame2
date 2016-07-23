import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers';
import Main from './Main';

const logger = createLogger();

const applicationStore = createStore(
  reducer,
  __DEV__ ? applyMiddleware(thunk, logger) : applyMiddleware(thunk)
);

function StoreProvider() {
  return (
    <Provider store={applicationStore}>
      <Main />
    </Provider>
  );
}

export default StoreProvider;
