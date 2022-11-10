import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PreventRemoveProvider, UNSTABLE_usePreventRemove, usePreventRemoveContext } from '@react-navigation/native';
import SideMenu from '../components/SideMenu/SideMenu';
import Animated, { Layout, SlideInLeft, SlideInRight, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = (props: Props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  UNSTABLE_usePreventRemove(openMenu, (data) => {
    openSubMenu ? setOpenSubMenu(false) : setOpenMenu(false);
  });

  const toggleMenu = () => {

    setOpenMenu(!openMenu);
  }

  return (
    <View>
      <Text>DetailsScreen</Text>
      <Button title={`${!openMenu ? 'Open': 'Close'} Menu`} onPress={toggleMenu} />
      <SideMenu open={openMenu} subMenuOpen={openSubMenu} setOpenSubMenu={setOpenSubMenu}/>
    </View>
  )
}
export default DetailsScreen

const styles = StyleSheet.create({
  menuContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    display: 'flex',
  },
  container: {
    display: 'flex',
    backgroundColor: "#202124",
    width: '40%',
    height: '100%',
  },
  innerContainer: {
    height: '100%',
  }
})