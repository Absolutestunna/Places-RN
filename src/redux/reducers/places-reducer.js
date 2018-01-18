import { ADD_PLACE, SET_PLACES, DELETE_PLACE, PLACE_ADDED, RESET_ADD_PLACE } from '../actions/actionTypes'

const initialState = {
  placesList: [],
  placeAdded: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
    return {
      ...state,
      placesList: action.places
    };
    break;
    case DELETE_PLACE:
      return {
        ...state,
        placesList: state.placesList.filter(place => {
          return place.key !== action.key;
        })
      }
    break;
    case PLACE_ADDED:
      return {
        ...state,
        placeAdded: true
      }
    break;
    case RESET_ADD_PLACE:
      return {
        ...state,
        placeAdded: false
      }
    break;
    default:
      return state
  }
};

export default reducer
