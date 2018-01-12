import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

export const addPlace = (placeName, location, image) => {
  return {
    type: ADD_PLACE,
    place: placeName,
    location: location,
    image: image
  }
}

export const deletePlace = (placeKey) => {
  return {
    type: DELETE_PLACE,
    placeKey
  }
}
