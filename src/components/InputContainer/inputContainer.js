import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';


const InputContainer = props => (
    <DefaultInput
      placeholder="Place Name"
      value={props.placeData.value}
      valid={props.placeData.valid}
      touched={props.placeData.touched}
      onChangeText={props.onChangeText}
    />
)



export default InputContainer;
