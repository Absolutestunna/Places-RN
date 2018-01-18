import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';


//screens
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/placeDetail';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';

//store configuration
import configureStore from './src/redux/configureStore';
const store = configureStore();

//register screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("awesome-places.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("awesome-places.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("awesome-places.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent("awesome-places.SideDrawerScreen", () => SideDrawerScreen, store, Provider);


//start the default app
const startApp = () => {
    Navigation.startSingleScreenApp({
    screen: {
      screen: "awesome-places.AuthScreen",
      title: "Login"
    }
  })
}


startApp();
export default startApp;
