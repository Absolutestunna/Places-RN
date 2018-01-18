import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import { getPlaces } from "../../redux/actions/index";

//local components
import PlaceList from '../../components/Listing/placesListing';

const mapStateToProps = state => {
  return {
    placesList: state.places.placesList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  };
};


class FindPlaceScreen extends Component {

  static navigatorStyle = {
    navBarButtonColor: "orange"
  }
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    fadeAnim: new Animated.Value(0),

  }

  onNavigatorEvent = (event) => {
    if (event.type === "ScreenChangedEvent"){
      if(event.id === "willAppear"){
        this.props.onLoadPlaces();
      }
    }
    if (event.type === "NavBarButtonPress"){
      if (event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  }
  placeSelectedHandler = key => {

    const selPlace = this.props.placesList.find(place => {
        return place.key === key
    });

    this.props.navigator.push({
      screen: "awesome-places.PlaceDetailScreen",
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace
      }
    })
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.fadeAnim,
    {
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    }).start()


  }

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    })
  }

  render(){
    const { placesList } = this.props;
    let { placesLoaded, removeAnim, fadeAnim } = this.state;

    let content = (
      <Animated.View
        style={{
          opacity: removeAnim,
          transform: [
            {
              scale: removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>
              Find Places
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

    );

    if (placesLoaded){
      content = (
        <Animated.View
          style={{
            opacity: fadeAnim
          }}>
          <PlaceList
            placesList={ placesList }
            onPlaceSelected={this.placeSelectedHandler}
          />
        </Animated.View>

      )
    }
    return (
      <View style={ placesLoaded ? null : styles.buttonContainerStyle }>
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  searchButton: {
    borderColor: "orange",
    borderWidth: 5,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 26
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);
