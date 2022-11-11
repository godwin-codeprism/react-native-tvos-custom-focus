import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

const menuItems = [
  {title: 'Home', link: '/'},
  {title: 'About', link: '/about'},
  {title: 'Contact', link: '/contact'},
  {title: 'Home', link: '/'},
  {title: 'About', link: '/about'},
  {title: 'Contact', link: '/contact'},
];

/// inteface for the props
interface MenuProps {
  setMenuHasFocus: (value: boolean) => void;
  menuHasFocus: boolean;
  firstCardRef: React.RefObject<TouchableOpacity>;
  setCardFocus: () => void;
}

export default function Menu({
  setMenuHasFocus,
  menuHasFocus,
  setCardFocus,
}: MenuProps) {
  const currentHubRef = menuItems.map(() =>
    React.useRef<TouchableOpacity>(null),
  );
  const [lastActiveIndex, setLastActiveIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const onFocusBar = () => {
    setActiveIndex(null);
    if (!menuHasFocus) {
      currentHubRef[lastActiveIndex].current?.setNativeProps({
        hasTVPreferredFocus: true,
      });
      setMenuHasFocus(true);
    } else {
      setCardFocus();
      // firstCardRef.current?.setNativeProps({hasTVPreferredFocus: true});
    }
  };
  // const currentHubRef = React.useRef<TouchableOpacity>(null);

  const onFocus = (index: number) => {
    setActiveIndex(index);
    setLastActiveIndex(index);
    // // if(!menuHasFocus){
    //   currentHubRef.current?.setNativeProps({hasTVPreferredFocus: true});
    //   setMenuHasFocus(true);
    // } else {
    //   setCardFocus();
    //   // firstCardRef.current?.setNativeProps({hasTVPreferredFocus: true});
    // }
  };

  return (
    <React.Fragment>
      <View style={MenuStyles.container}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={`item-${index}`}
            ref={currentHubRef[index]}
            style={
              activeIndex === index
                ? {
                    ...MenuStyles.menuItems,
                    borderColor: 'green',
                    transform: [
                      {
                        scale: 1.5,
                      },
                    ],
                  }
                : MenuStyles.menuItems
            }
            onFocus={() => {
              onFocus(index);

              // console.log('menu ', index);
            }}
            // onBlur={() => {
            //   console.log('onBlur', index)
            //   setLastActiveIndex(index);
            //   setActiveIndex(null);
            // }}
          >
            <Text style={MenuStyles.item}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={{backgroundColor: 'red', height: 20, width: '100%'}}
        onFocus={onFocusBar}></TouchableOpacity>
    </React.Fragment>
  );
}

const MenuStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
  },
  item: {
    color: 'white',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // // backgroundColor: '#007CFA',
    // marginHorizontal: 10,
  },
  menuItems: {
    width: 100,
    height: 30,
    backgroundColor: 'blue',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'transparent',
    marginLeft: 40,
  },
});
