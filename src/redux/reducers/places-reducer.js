import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

const reducer = (state = { placesList: [] }, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        placesList: state.placesList.concat({
          key: Math.random(),
          name: action.place,
          location: action.location,
          img: { uri: action.image.uri }
        })
      }
    case DELETE_PLACE:
      return {
        ...state,
        placesList: state.placesList.filter(place => {
          return place.key !== action.placeKey;
        })
      }
    default:
      return state
  }
};

export default reducer
