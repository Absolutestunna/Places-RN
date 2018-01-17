import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStopLoading, uiStartLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import { AsyncStorage } from "react-native";

const errorCodes = {
  "EMAIL_EXISTS": "The email address is already in use by another account.",
  "OPERATION_NOT_ALLOWED": "Password sign-in is disabled for this project.",
  "TOO_MANY_ATTEMPTS_TRY_LATER": "We have blocked all requests from this device due to unusual activity. Try again later.",
  "EMAIL_NOT_FOUND": "There is no user record corresponding to this identifier. The user may have been deleted.",
  "INVALID_EMAIL": "Please provide a legitimate email.",
  "INVALID_PASSWORD": "The password is invalid or the user does not have a password.",
  "USER_DISABLED": "The user account has been disabled by an administrator."
}

export const tryAuth = (authData, authMode) => {
  console.log('authMode', authMode);
  return dispatch => {
    dispatch(uiStartLoading());
    const apiKey = "AIzaSyBLZ6leE9BQ4bljpCjZKdJ8Zg-csVHXyZs";
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
    if (authMode === "signup"){
        url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey;
    }

    fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .catch(function(err){
        alert("Authentication failed. Please try again")
      })
      .then(function(res) {
        return res.json()
      })
      .then(function(parsedRes) {
        dispatch(uiStopLoading());
        if(!parsedRes.idToken){
          alert(errorCodes[parsedRes.error.message])
          dispatch(uiStopLoading())

        } else {
          dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn))
          startMainTabs();
        }
      })

  }
}

export const authStoreToken = (token, expiresIn) => {
  return dispatch => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryDate = now.getTime() + (expiresIn * 1000);     //milliseconds
    AsyncStorage.setItem("ap:auth:token", token)
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString())     //expiration time for token

  }
}

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  }
}

export const authGetToken = () => {
  return (dispatch, getState) => {

    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if(!token){
        let fetchedToken;
        AsyncStorage.getItem("ap:auth:token")
          .catch(err => {
            console.log('get token err', err);
            reject()
          })
          .then(tokenResponse => {
            fetchedToken = tokenResponse;
            if (!tokenResponse){                        //check for available token
              reject();
              return;
            }

            return AsyncStorage.getItem("ap:auth:expiryDate")

          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if(parsedExpiryDate > now){                  //check if token is expired
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);                     //save to async storage
            } else {
              reject();                                  //not valid token
            }
          })
          .catch(err => reject())
      } else {
        resolve(token)
      }
    })
    return promise;
  }
}

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(function(token){
        startMainTabs()
      })
      .catch(function(err){console.log('Failed to fetch token')})

  }
}
