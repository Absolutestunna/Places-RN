import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


const DrawerItem = (props) => {
  return (
    <View style={styles.container}>
      <Icon {...props} style={[styles.drawerIconItem]}/>
      <Text>{props.text}</Text>
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  drawerIconItem: {
    marginRight: 10,
    padding: 10,
  }
})

export default DrawerItem;
