import React, { PropTypes } from 'react';

export default function withUser(Composed) {
  function WithUser(props) {
    return <Composed {...props} user={this.context.user} />;
  }

  WithUser.contextTypes = {
    user: PropTypes.object.isRequired,
  };
}
