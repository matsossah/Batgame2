import React, { PropTypes } from 'react';

export default function withUser(Composed) {
  function WithUser(props, context) {
    return <Composed {...props} user={context.user} />;
  }

  WithUser.contextTypes = {
    user: PropTypes.object.isRequired,
  };

  return WithUser;
}
