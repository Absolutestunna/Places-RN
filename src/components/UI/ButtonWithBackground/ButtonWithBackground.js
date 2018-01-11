import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native';

const buttonWithBackground = props => {
  let content = (
    <View style={[style.button, {backgroundColor: props.color}, props.disabled ? style.disabled: null]}>
      <Text style={props.disabled ? style.disabledText : null}>{props.children}</Text>
    </View>
  );

  if (props.disabled){
    return content
  }

  if (Platform.OS === "android"){
    return (
      <TouchableNativeFeedback>
        {content}
      </TouchableNativeFeedback>
    )
  }
  return (
    <TouchableOpacity onPress={props.onPress}>
      {content}
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black"
  },
  disabled: {
    backgroundColor: "#eee",
    borderColor: "#aaa"
  },
  disabledText: {
    color: "#aaa",
  }
})

export default buttonWithBackground;
