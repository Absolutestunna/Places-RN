import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

export const addPlace = (placeName, location) => {
  return {
    type: ADD_PLACE,
    place: placeName,
    location: location
  }
}

export const deletePlace = (placeKey) => {
  return {
    type: DELETE_PLACE,
    placeKey
  }
}
