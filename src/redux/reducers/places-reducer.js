import { ADD_PLACE, SET_PLACES, DELETE_PLACE } from '../actions/actionTypes'

const reducer = (state = { placesList: [] }, action) => {
  switch (action.type) {
    case SET_PLACES:
    return {
      ...state,
      placesList: action.places
    };
    case DELETE_PLACE:
      return {
        ...state,
        placesList: state.placesList.filter(place => {
          return place.key !== action.key;
        })
      }
    default:
      return state
  }
};

export default reducer
