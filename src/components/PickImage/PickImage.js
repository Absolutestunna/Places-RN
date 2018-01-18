import React, { Component } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker'

class PickImage extends Component {
  state = {
    pickedImage: null
  }

  reset = () => {
    this.setState({
      pickedImage: null
    })
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an image", maxHeight: 600, maxWidth: 800},
      res => {
        if(res.didCancel){
          console.log('User canceled');
        } else if(res.error){
          console.log("Error", res.error);
        } else {
          this.setState({
            pickedImage: { uri: res.uri }
          })
          this.props.onImagePicked({ uri: res.uri, base64: res.data })
        }
    });
  }
  render(){
    return (
      <View style={style.container}>
        <View style={style.placeholder}>
          <Image source={this.state.pickedImage} style={style.islandImagePlaceHolder}/>
        </View>
        <View style={style.imageButton}>
          <Button title="Pick Image" onPress={this.pickImageHandler}/>
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
