import { View, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppStyles from '../../App.styles'
import Carousals from '../components/Carousals/Carousals'
import Menu from '../components/Menu/Menu';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import {  } from 'react-native-screens/native-stack';

type Props = NativeStackScreenProps<RootStackParamList,'Home'>;

const HomeScreen = (props: Props) => {
  const [menuHasFocus, setMenuHasFocus] = useState(true);
  const firstCardRef = useRef<TouchableOpacity>(null);
  const setCardFocus = () => {
    firstCardRef.current?.setNativeProps({ hasTVPreferredFocus: true });
  }

  const goToDetails = () => {
    props.navigation.navigate('Details',{});
  }

  const hasUnsavedChanges = true;
  React.useEffect(
    () =>
      props.navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();
      }),
    [props.navigation, hasUnsavedChanges]
  );


  return (
    <View style={AppStyles.container}>
      <Menu setMenuHasFocus={setMenuHasFocus} menuHasFocus={menuHasFocus} firstCardRef={firstCardRef} setCardFocus={setCardFocus} />
      <Carousals setMenuHasFocus={setMenuHasFocus} menuHasFocus={menuHasFocus} ref={firstCardRef} goToDetails={goToDetails}/>
    </View>
  )
}

export default HomeScreen;