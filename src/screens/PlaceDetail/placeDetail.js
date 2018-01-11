import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';


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
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  onClosePageHandler = () => {
    this.props.navigator.pop();
  }
  render(){
    const { selectedPlace } = this.props;
    console.log('this.state.viewMode in place detail', this.state.viewMode);
    return (
        <View
          style={[
            styles.containerStyle, this.state.viewMode === "portrait"
            ? styles.portraitDetailStyleContainer
            : styles.landscapeDetailStyleContainer
          ]}>

          <View style={styles.subContainer}>
            <Image source={ selectedPlace.img } style={styles.imageStyling}/>
          </View>

          <View style={styles.subContainer}>
            <View>
              <Text style={styles.placeName}>
                {selectedPlace.name}
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
  imageStyling: {
    width: "100%",
    height: 200
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
})


export default connect(null, mapDispatchToProps)(PlaceModal);
