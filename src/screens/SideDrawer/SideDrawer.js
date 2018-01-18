import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DrawerItem from '../../components/UI/DrawerItems/DrawerItems';
import { authLogout } from '../../redux/actions/index';

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  }
}

class SideDrawer extends Component {
  signOutHandler = () => {
    console.log('this.props', this.props);
    this.props.onLogout();
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

export default connect(null, mapDispatchToProps)(SideDrawer);
