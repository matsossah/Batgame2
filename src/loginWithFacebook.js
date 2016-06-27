import Parse from 'parse/react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

// @FIX: For testing purposes.
// This lets us access the LoginManager from the debugger ui's console.
global.LoginManager = LoginManager;

export default function loginWithFacebook(callback) {
  AccessToken.getCurrentAccessToken().then(res => {
    if (res === null) {
      callback(null, null);
      return;
    }
    // We need to retrieve the facebook access token in order to log in
    // the user.
    Parse.FacebookUtils.logIn({
      id: res.userID,
      access_token: res.accessToken,
      expiration_date: new Date(res.expirationTime).toISOString(),
    }, {
      success: user => {
        callback(null, user);
      },
      error: (user, err) => {
        callback(err, null);
      },
    });
  });
}
