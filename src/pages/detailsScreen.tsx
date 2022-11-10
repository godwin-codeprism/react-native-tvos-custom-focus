import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UNSTABLE_usePreventRemove } from '@react-navigation/native';
import SideMenu from '../components/SideMenu/SideMenu';
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