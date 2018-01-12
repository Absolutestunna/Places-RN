import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './src/redux/configureStore';

const store = configureStore();
const RNREDUX = () => (
  <Provider store={store}>
    <App />
  </Provider>
)



AppRegistry.registerComponent('placesRN', () => RNREDUX);
