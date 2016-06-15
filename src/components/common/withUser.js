import { connect } from 'react-redux';

export default function withUser(Composed) {
  return connect(state => ({ user: state.user }))(Composed);
}
