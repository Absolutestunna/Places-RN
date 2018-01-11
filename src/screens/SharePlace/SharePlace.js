import React, { Component } from 'react';
import { ScrollView, View, Text, Button, TextInput, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';


//local components
import { addPlace } from '../../redux/actions/index';
import PlaceInput from '../../components/InputContainer/inputContainer';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
// import LocateMap from '../../components/LocateMap/LocateMap';


//utility functions
import validate from '../../utility/validation';

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: placeName => dispatch(addPlace(placeName))
  }
}

class SharePlaceScreen extends Component {

  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }
  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      }
    }
  }


  onNavigatorEvent = (event) => {
    if (event.type === "NavBarButtonPress"){
      if (event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  }

  placeNameHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true,
          }
        }
      }
    })
  }

  placeAddHandler = () => {
    if (this.state.controls.placeName.value.trim() !== "") {
      this.props.onAddPlace(this.state.controls.placeName.value)
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            placeName: {
              value: ""
            }
          }
        }
      })
    }
  }
  render(){
    return (
      <ScrollView>
        <View style={style.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage />

          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameHandler}
          />
          <View style={style.imageButton}>
            <Button
              title="Share the place!"
              onPress={this.placeAddHandler}
              disabled={!this.state.controls.placeName.valid}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
})

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
