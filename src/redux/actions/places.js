import { DELETE_PLACE, SET_PLACES, PLACE_ADDED, RESET_ADD_PLACE } from '../actions/actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const resetPlaceAdd = () => {
  return {
    type: RESET_ADD_PLACE
  }
}

export const addPlace = (placeName, location, image) => {

  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(function(){
        alert("No valid token found")
      })
      .then(function(token){
        authToken = token;
        return fetch(
          "https://us-central1-places-rn-1515696518254.cloudfunctions.net/storeImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              "Authorization": "Bearer " + authToken
            }
          }
        );
      })
    .catch(function(err) {
      alert("Something went wrong, please try again!");
      dispatch(uiStopLoading());
    })
    .then((res) => {
      if(res.ok){
        return res.json()
      } else {
        throw(new Error())
      }
    })
    .then(data => {
      console.log('data with image path', data);
      const placeData = {
        place: placeName,
        location: location,
        image: data.imageUrl,
        path: data.imagePath
      };
      return fetch("https://places-rn-1515696518254.firebaseio.com/places.json?auth=" + authToken, {
        method: "POST",
        body: JSON.stringify(placeData)
      })
    })
    .then((res) => {
      if(res.ok){
        return res.json()
      } else {
        throw(new Error())
      }
    })
    .then(function(parsedData){
      console.log("parsedData", parsedData);
      dispatch(uiStopLoading());
      dispatch(placeAdded())
    })
    .catch(function(err) {
      console.log('err', err);
      alert("Something went wrong, please try again!");
      dispatch(uiStopLoading());
    })
  }
}

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  }
}

let validateResponse = (res) => {
  console.log('res', res);
  if(res.ok){
    return res.json()
  } else {
    throw(new Error())
  }
}

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
          .then(function(token) {
            return fetch("https://places-rn-1515696518254.firebaseio.com/places.json?auth=" + token)
          })
          .catch(() => {
            alert("No valid token found")
          })
          .then((res) => {
            if(res.ok){
              return res.json()
            } else {
              throw(new Error())
            }
          })
          .then((parsedRes) => {
              const places = [];
              for (let key in parsedRes) {
                  places.push({
                      ...parsedRes[key],
                      image: {
                          uri: parsedRes[key].image
                      },
                      key: key
                  });
              }
              dispatch(setPlaces(places));
          })
          .catch(function(err) {
              alert("Something went wrong, sorry :/");
              console.log(err);
          })
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
};

export const deletePlace = key => {

  return dispatch => {
    dispatch(authGetToken())
      .catch(function(err) {
          alert("No valid token");    //catch token errors
          console.log(err);
      })
      .then(function(token){
        dispatch(deleteComplete(key)) //remove key in local state
            return fetch(`https://places-rn-1515696518254.firebaseio.com/places/${key}.json?auth=${token}`, {
                method: 'DELETE'
              })
          })
          .then(function(parsedRes){
            console.log('parsedRes', parsedRes);
            console.log('Done!');
          })
          .catch(function(err) {
              alert("Something went wrong. Couldn't delete sorry :/");
              console.log(err);
          })
  }
}

const deleteComplete = key => {
  return {
    type: DELETE_PLACE,
    key: key
  }
}
