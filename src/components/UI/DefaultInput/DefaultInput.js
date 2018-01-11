import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DefaultInput = props => {
  return (
    <TextInput
      underlineAndroid="transparent"
      {...props}
      style={[style.input, props.style, !props.valid && props.touched ? style.invalid : null ]}
      />
  )
}

const style = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    padding: 5,
    borderColor: "#eee"
  },
  invalid: {
    backgroundColor: "#f9c0c0"
  }

})

export default DefaultInput;
