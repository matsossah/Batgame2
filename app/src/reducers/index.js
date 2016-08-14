import { combineReducers } from 'redux';
import application from './application';
import navigation from './navigation';

export default combineReducers({
  application,
  navigation,
});
