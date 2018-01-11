import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DrawerItem from '../../components/UI/DrawerItems/DrawerItems';

class SideDrawer extends Component {
  signOutHandler = () => {
    this.props.navigator.push({
      screen: 'awesome-places.AuthScreen'
    });
  }
  render(){
    let platformDrawerLogo = Platform.OS === "android" ? "md-log-out" : "ios-log-out";
    return (
      <View style={[styles.container, {width: Dimensions.get('window').width * 0.8}]}>
        <TouchableOpacity onPress={this.signOutHandler}>
          <DrawerItem name={platformDrawerLogo} size={30} color="#bbb" text="Sign Out" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1
  }
})

export default SideDrawer;
