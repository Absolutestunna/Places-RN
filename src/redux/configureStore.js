import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import placesReducer from './reducers/places-reducer';
import uiReducer from "./reducers/ui";
import authReducer from './reducers/auth';


const rootReducer = combineReducers({
  places: placesReducer,
  ui: uiReducer,
  auth: authReducer

});

let composeEnhancers = compose;

//
// if (__DEV__){
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
//
// }

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
};


export default configureStore;
