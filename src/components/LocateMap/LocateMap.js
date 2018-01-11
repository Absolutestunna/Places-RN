import React, { Component } from 'react';
import { Button, Image, View, Text, StyleSheet, Dimensions } from 'react-native';


class LocateMap extends Component {

  state = {
    focusedLocation: {
      latitude: 37.79300352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    }
  }
  render(){
    return (
      <View style={style.container}>

        <View style={style.imageButton}>
          <Button title="Locate Me" onPress={() => alert('som')}/>
        </View>
      </View>

    )
  }
}

const style = StyleSheet.create({
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
