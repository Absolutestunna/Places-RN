import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity , Image} from 'react-native';

const listItem = ( { place, onItemPressed, placeImage } ) => (
  <TouchableOpacity onPress={onItemPressed}>
    <View style={styles.listItemStyle}>
      <Image source={placeImage} style={styles.placeImageStyle}/>
      <Text> { place } </Text>
    </View>
  </TouchableOpacity>

)


const styles = StyleSheet.create({

  listItemStyle: {
    width: '100%',
    padding: 10,
    margin: 8,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },
  placeImageStyle: {
    marginRight: 8,
    width: 30,
    height: 30
  }

})

export default listItem;
