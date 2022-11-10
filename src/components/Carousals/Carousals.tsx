import { View, Text, FlatList, StyleSheet, TouchableOpacity, NativeModules } from 'react-native'
import React, { ComponentClass, ComponentElement, useEffect, useRef } from 'react'

const items = [
  {
    title: 'Movies'
  },
  {
    title: 'TV Shows'
  },
  {
    title: 'Music'
  },
  {
    title: 'Books'
  },
  {
    title: 'Podcasts'
  }
]

/// inteface for the props
interface CarousalsProps {
  setMenuHasFocus: (value: boolean) => void;
  menuHasFocus: boolean;
  goToDetails: () => void;
}

const Carousals = React.forwardRef<TouchableOpacity, CarousalsProps>(({setMenuHasFocus, menuHasFocus, goToDetails}:CarousalsProps, ref) => {

  const onCardFocus: (value: {cindex:number,index:number}) => void = ({cindex, index}) => {
    if(menuHasFocus){
      setMenuHasFocus(false);
    }
  }
  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => `item-${index}`}
      renderItem={({ item, index: cIndex }) => (
        <View style={CarousalsStyles.item}>
          <Text style={CarousalsStyles.itemText}>{item.title}</Text>
          <FlatList
            data={Array(16).fill(0)}
            keyExtractor={(item, index) => `card-${index}`}
            horizontal
            renderItem={({ item, index }) => (
              <TouchableOpacity style={CarousalsStyles.card} ref={index === 0 && cIndex === 0 ? ref : null} onPress={goToDetails} onFocus={() => onCardFocus({cindex: cIndex, index: index})}>
                <Text> Card {index} </Text>
                </TouchableOpacity>
            )}
          />
        </View>
      )}
    />
  )
})

const CarousalsStyles = StyleSheet.create({
  item:{},
  itemText:{
    color: 'black',
    fontSize: 20,
    marginVertical: 10
  },
  card: {
    width: 160,
    height: 90,
    backgroundColor: '#007CFA',
    borderRadius: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems:'center'
  }
});

export default Carousals;