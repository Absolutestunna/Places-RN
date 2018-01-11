import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

export const addPlace = (placeName) => {
  return {
    type: ADD_PLACE,
    place: placeName
  }
}

export const deletePlace = (placeKey) => {
  return {
    type: DELETE_PLACE,
    placeKey
  }
}
