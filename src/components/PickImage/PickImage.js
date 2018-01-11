import React, { Component } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import islandTreeImage from '../../assets/islandtree.jpg';


class PickImage extends Component {
  render(){
    return (
      <View style={style.container}>
        <View style={style.placeholder}>
          <Image source={islandTreeImage} style={style.islandImagePlaceHolder}/>
        </View>
        <View style={style.imageButton}>
          <Button title="Pick Image" onPress={() => alert('som')}/>
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
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  imageButton: {
    margin: 8
  },
  islandImagePlaceHolder : {
    width: "100%",
    height: "100%"
  }
})

export default PickImage;
