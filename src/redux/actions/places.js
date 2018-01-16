import { ADD_PLACE, DELETE_PLACE, SET_PLACES } from '../actions/actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {

  return dispatch => {
    dispatch(uiStartLoading());
    fetch("https://us-central1-places-rn-1515696518254.cloudfunctions.net/storeImage", {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    })
    .catch(function(err) {
      console.log('image error', err);
      alert("Something went wrong, please try again!");
      dispatch(uiStopLoading());

    })
    .then(function(res) {
      console.log('raw json', res);
      return res.json()
    })
    .then(data => {
      const placeData = {
        place: placeName,
        location: location,
        image: data.imageUrl
      };
      return fetch("https://places-rn-1515696518254.firebaseio.com/places.json", {
        method: "POST",
        body: JSON.stringify(placeData)
      })
    })
    .catch(function(err) {
      dispatch(uiStopLoading());

    })
    .then(function(res){
      return res.json()
    })
    .then(function(parsedData){
      dispatch(uiStopLoading());

    })
  }
}

export const getPlaces = () => {
    return dispatch => {
        fetch("https://places-rn-1515696518254.firebaseio.com/places.json")
        .catch(function(err) {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(function(res) {return res.json()})
        .then(function(parsedRes) {
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
        });
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
    fetch(`https://places-rn-1515696518254.firebaseio.com/places/${key}.json`, {
      method: 'DELETE'
    })
    .catch(function(err) {
        alert("Something went wrong. Couldn't delete sorry :/");
        console.log(err);
    })
    .then(function(res) {
      console.log('res', res);
      dispatch(deleteComplete(key))
    })

  }
}

const deleteComplete = key => {
  return {
    type: DELETE_PLACE,
    key: key
  }
}
