import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

const initialState = {
  placesList: [
    { key: Math.random(), name: "Ojuelegba", img: { uri: 'https://static.pexels.com/photos/2438/nature-forest-waves-trees.jpg'}},
    { key: Math.random(), name: "Otukpa", img: { uri: 'https://static.pexels.com/photos/2438/nature-forest-waves-trees.jpg'}}
  ]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        placesList: state.placesList.concat({
          key: Math.random(),
          name: action.place,
          img: { uri: 'https://static.pexels.com/photos/2438/nature-forest-waves-trees.jpg'}
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
