import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps'

import { deletePlace } from '../../redux/actions/index';


const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (placeKey) => dispatch(deletePlace(placeKey))
  }
}

class PlaceModal extends Component {

  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
  }

  constructor(props){
    super(props);
    Dimensions.addEventListener("change", this.updateStylesFunc)
  }

  updateStylesFunc = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    })
  }

  componentWillUnmount(){
    //prevent memory leak
    Dimensions.removeEventListener("change", this.updateStylesFunc)
  }

  onDeletePlaceHandler = () => {
    console.log('key for delete', this.props.selectedPlace.key);
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  onClosePageHandler = () => {
    this.props.navigator.pop();
  }
  render(){
    const { selectedPlace: { location: { latitude, longitude }, place, image } } = this.props;
    let focusedLocation = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    }
    return (
        <View
          style={[
            styles.containerStyle, this.state.viewMode === "portrait"
            ? styles.portraitDetailStyleContainer
            : styles.landscapeDetailStyleContainer
          ]}>

          <View style={styles.subContainerStyling}>
            <View style={styles.subContainer}>
                <Image source={ image } style={styles.imageStyling}/>
            </View>

            <View style={styles.subContainer}>
                <MapView
                  initialRegion={focusedLocation}
                  style={styles.map}>
                  <MapView.Marker
                      coordinate={focusedLocation}
                    />
                </MapView>
            </View>

          </View>


          <View style={styles.subContainer}>
            <View>
              <Text style={styles.placeName}>
                {place}
              </Text>
            </View>

            <View style={styles.reactButtonsStyle}>
              <TouchableOpacity onPress={this.onDeletePlaceHandler}>
                <View style={styles.deleteButton}>
                  <Icon size={30} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color="red"/>
                </View>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    margin: 22,
    flex: 1
  },
  subContainer: {
    flex: 1
  },
  subContainerStyling: {
    flex: 3,
  },
  imageStyling: {
    width: "100%",
    height: "100%",
  },
  portraitDetailStyleContainer: {
    flexDirection: "column",
  },
  landscapeDetailStyleContainer: {
    flexDirection: "row",
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    color: "black",
    marginTop: 10
  },
  reactButtonsStyle: {
    flexDirection: "row",
    justifyContent: "center"

  },
  deleteButton: {
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,

  },
})


export default connect(null, mapDispatchToProps)(PlaceModal);
