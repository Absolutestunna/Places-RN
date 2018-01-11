import React, { Component } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';

import ListItem from '../Listing/placeItem';

const listItems = ( { placesList, onPlaceSelected } ) => {

    return (
        <FlatList
          style={styles.placesListStyle}
          data={placesList}
          renderItem={(info) => (
            <ListItem
              place={info.item.name}
              onItemPressed={() => onPlaceSelected(info.item.key)}
              placeImage={info.item.img}
              />
          )}
        />
    )
}

const styles = StyleSheet.create({

  placesListStyle: {
    width: '100%'
  }
})


export default listItems;
