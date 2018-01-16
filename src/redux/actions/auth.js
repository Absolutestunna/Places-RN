import { TRY_AUTH } from './actionTypes';

export const tryAuth = (authData) => {
  return dispatch => {
    dispatch(authSignup(authData))
  }
}

export const authSignup = (authData) => {
  return dispatch => {
    fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.FIREBASE_AUTH}`, {
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
      console.log('err', err);
      alert("Authentication failed. Please try again")
    })
    .then(function(res){
      return res.json()
    })
    .then(function(parsedRes){
      console.log('parsedRes', parsedRes);
    })


  }
}
