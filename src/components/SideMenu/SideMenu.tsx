import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type Props = {
  open: boolean,
  setOpenSubMenu: (open: boolean) => void
  subMenuOpen: boolean
}

const SideMenu = (props: Props) => {
  const halfOpenOffset = Dimensions.get('screen').width * .2;
  const fullCloseOffset = Dimensions.get('screen').width * .4;
  const fullOpenOffset = 0;
  const offset = useSharedValue(fullCloseOffset);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(offset.value, {
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 300
          })
        },
      ],
    };
  });

  useEffect(() => {
    offset.value = props.open ? props.subMenuOpen ? fullOpenOffset : halfOpenOffset : fullCloseOffset;
    if(!props.open) {
      props.setOpenSubMenu(false);
    }
  }, [props.open, props.subMenuOpen]);

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <View style={styles.innerContainer}>
        {
          Array(5).fill(0).map((_, i) => {
            return (
              <TouchableOpacity key={i} style={styles.menuItem} onPress={() => { props.setOpenSubMenu(!props.subMenuOpen) }}>
                <Text style={styles.MenuItemText}> Menu Item {i}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <View style={[styles.innerContainer, styles.subMenuContainer]}>
        {
          Array(5).fill(0).map((_, i) => {
            return (
              <TouchableOpacity key={i} style={styles.menuItem} onPress={() => { props.setOpenSubMenu(!props.subMenuOpen) }}>
                <Text style={styles.MenuItemText}> SubMenu Item {i}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </Animated.View>
  )
}

export default SideMenu

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191b1f",
    width: '40%',
    height: '100%',
    alignSelf: 'flex-end',
    flexDirection: 'row'
  },
  innerContainer: {
    height: '100%',
    padding: 20,
    width: '50%'
  },
  menuItem: {
    color: 'white',
    height: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#454545',
    marginBottom: 10
  },
  MenuItemText: {
    color: 'white'
  },
  subMenuContainer: {
    backgroundColor: "#202124",
  }
});