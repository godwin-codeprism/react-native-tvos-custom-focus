import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const menuItems = [
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title: 'Contact', link: '/contact' },
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title: 'Contact', link: '/contact' },
]

/// inteface for the props
interface MenuProps {
  setMenuHasFocus: (value: boolean) => void;
  menuHasFocus: boolean;
  firstCardRef: React.RefObject<TouchableOpacity>;
  setCardFocus: () => void;
}

export default function Menu({setMenuHasFocus, menuHasFocus, setCardFocus}:MenuProps) {


  const currentHubRef = React.useRef<TouchableOpacity>(null);

  const onFocus = () => {
    if(!menuHasFocus){
      currentHubRef.current?.setNativeProps({hasTVPreferredFocus: true});
      setMenuHasFocus(true);
    }else{
      setCardFocus();
      // firstCardRef.current?.setNativeProps({hasTVPreferredFocus: true});
    }
  };

  return (
    <React.Fragment>
    <View style={MenuStyles.container}>
      {
        menuItems.map((item, index) => (
          <TouchableOpacity key={`item-${index}`} ref={index === 0 ? currentHubRef : null}>
            <Text style={MenuStyles.item}>{item.title}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
    <TouchableOpacity style={{backgroundColor:'red', height: 10, width: '100%'}} onFocus={onFocus}></TouchableOpacity>
    </React.Fragment>
  )
}

const MenuStyles  = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row'
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007CFA',
    marginHorizontal: 10
  }
});