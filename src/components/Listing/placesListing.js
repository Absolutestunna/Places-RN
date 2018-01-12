import React, { Component } from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';

import ListItem from '../Listing/placeItem';

const listItems = ( { placesList, onPlaceSelected } ) => {

    return (
       (Array.isArray(placesList) && placesList.length) ?
        (<FlatList
          style={styles.placesListStyle}
          data={placesList}
          renderItem={(info) => (
            <ListItem
              place={info.item.name}
              onItemPressed={() => onPlaceSelected(info.item.key)}
              placeImage={info.item.img}
              />
          )}
        />) : <View style={styles.emptyListStyling}>
              <Text>You have an empty list</Text>
              <Text>Please add a current location</Text>

            </View>
    )
}

const styles = StyleSheet.create({
  emptyListStyling: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  placesListStyle: {
    width: '100%'
  }
})


export default listItems;
