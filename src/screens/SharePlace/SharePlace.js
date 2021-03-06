import React, { Component } from 'react';
import { ScrollView,
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator
 } from 'react-native';
import { connect } from 'react-redux';


//local components
import { addPlace } from '../../redux/actions/index';
import PlaceInput from '../../components/InputContainer/inputContainer';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import LocateMap from '../../components/LocateMap/LocateMap';


//utility functions
import validate from '../../utility/validation';

//actions
import { resetPlaceAdd } from '../../redux/actions/index'


const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
    onResetPlaceAdd: () => dispatch(resetPlaceAdd())
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded
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

  componentWillMount(){
    this.reset();
  }

  componentDidUpdate(){
    if(this.props.placeAdded){
      this.props.navigator.switchToTab({tabIndex: 0});
      // this.props.onResetPlaceAdd();
    }
  }

  reset = () => {
    this.setState({
      controls: {
        placeName: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    })
  }


  onNavigatorEvent = (event) => {
    if (event.type === "ScreenChangedEvent"){
      if(event.id === "willAppear"){
        this.props.onResetPlaceAdd()
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
    const { placeName, location, image } = this.state.controls;
    this.props.onAddPlace(placeName.value, location.value, image.value);
    this.reset();
    this.imagePicker.reset();
    this.locationPicker.reset();
  }

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      }
    })
  }

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    })
  }


  render(){
    let submitButton = (
      <Button
        title="Share the place!"
        onPress={this.placeAddHandler}
        disabled={!this.state.controls.placeName.valid ||
          !this.state.controls.location.valid ||
          !this.state.controls.image.valid
        }
      />
    );

    if(this.props.isLoading){
      submitButton = (
        <ActivityIndicator />
      )
    }
    return (
      <ScrollView>
        <View style={style.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickedHandler} ref={ref => this.imagePicker = ref}/>
          <LocateMap
            onLocatedPick={this.locationPickedHandler}
            ref={ref => this.locationPicker = ref}
            />

          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameHandler}
          />
          <View style={style.imageButton}>
            {submitButton}
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

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
