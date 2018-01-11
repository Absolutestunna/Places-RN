import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
console.log('App', App);
import configureStore from './src/redux/configureStore';

const store = configureStore();
console.log('store', store);
const RNREDUX = () => (
  <Provider store={store}>
    <App />
  </Provider>
)



AppRegistry.registerComponent('placesRN', () => RNREDUX);
