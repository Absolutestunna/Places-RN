import React, { Component } from 'react';
import { Button, Image, View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class LocateMap extends Component {

  state = {
    focusedLocation: {
      latitude: 37.79300352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    },
    locationChosen: false
  }

  pickLocation = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      }
    });
    this.props.onLocatedPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    })

  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      }
      this.pickLocation(coordsEvent);
    },
    err => {
      console.log('err', err);
      alert('Fetching position failed. Please pick a location manually')
    });
  }
  render(){
    let marker = null;
    if (this.state.locationChosen){
      marker = (<MapView.Marker
          coordinate={this.state.focusedLocation}
        />)
    }
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocation}
          ref={ref => this.map = ref}
          >
          {marker}
        </MapView>
        <View style={styles.imageButton}>
          <Button title="Locate Me" onPress={this.getCurrentLocation}/>
        </View>
      </View>

    )
  }

}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 250
  },
  imageButton: {
    margin: 8
  }
})

export default LocateMap;
