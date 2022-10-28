import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import AppStyles from './App.styles'
import Menu from './src/components/Menu/Menu'
import Carousals from './src/components/Carousals/Carousals'

export default function App() {
  const [menuHasFocus, setMenuHasFocus] = useState(true);
  const firstCardRef = useRef<TouchableOpacity>(null);
  const setCardFocus = () => {
    console.log(firstCardRef.current);
    firstCardRef.current?.setNativeProps({hasTVPreferredFocus: true});
  }
  return (
    /// View with text inside
    <View style={AppStyles.container}>
      <Menu setMenuHasFocus={setMenuHasFocus} menuHasFocus={menuHasFocus} firstCardRef={firstCardRef} setCardFocus={setCardFocus}/>
      <Carousals setMenuHasFocus={setMenuHasFocus} menuHasFocus={menuHasFocus} ref={firstCardRef}/>
    </View>
  )
}