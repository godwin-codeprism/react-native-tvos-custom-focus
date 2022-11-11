import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  Dimensions,
} from 'react-native';
import React, {
  ComponentClass,
  ComponentElement,
  useEffect,
  useRef,
  useState,
} from 'react';
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const items = [
  {
    title: 'Movies',
  },
  {
    title: 'TV Shows',
  },
  {
    title: 'Music',
  },
  {
    title: 'Books',
  },
  {
    title: 'Podcasts',
  },
];
const {width, height} = Dimensions.get('screen');
const normalizedWidth = width / 1920;
const normalizedHeight = height / 1080;
interface CarousalsProps {
  setMenuHasFocus: (value: boolean) => void;
  menuHasFocus: boolean;
  goToDetails: () => void;
}

export const getScaledValue = (value: number): number => {
  return value * normalizedWidth;
};

const Carousals = React.forwardRef(({setMenuHasFocus, menuHasFocus,goToDetails}: CarousalsProps, ref) => {
  const EnableScrollAniamtions = true;
  const [currentCard, setCurrentCard] = useState<number | null>(null);
  const first = useRef<TouchableOpacity>(null);
  // const cardRef = useRef<TouchableOpacity>(null);
  const flatListRef = useRef<FlatList>(null);
  const innerFlatListRef = items.map(() => useRef<FlatList>(null));
  const [currentLane, setCurrentLane] = React.useState(0);
  const cardWidth = 180;
  const laneHeightComputation = 100; //(appStyles.card.height + appStyles.laneTitleContainer.height + (appStyles.swimlaneContainer.marginVertical * 2));
  const onLaneFocusChange = (laneIndex: number, index: number) => {
    if (currentLane !== laneIndex) {
      setCurrentLane(laneIndex);
      // flatListRef.current?.scrollToIndex({
      //   animated: EnableScrollAniamtions,
      //   index: laneIndex,
      // });
      innerFlatListRef[currentLane].current?.scrollToIndex({
        animated: EnableScrollAniamtions,
        index: index,
      });
    }
  };

  const cardPress = () => {
    if (first) {
      first.current?.setNativeProps({hasTVPreferredFocus: true});
    }
  };

  const onCardFocus = ({cindex, index}: any) => {
    console.log('I have focus now', cindex, index);
    setCurrentCard(index);
    innerFlatListRef[currentLane].current?.scrollToIndex({
      animated: EnableScrollAniamtions,
      index: index,
    });
    onLaneFocusChange(cindex, index);
    if (menuHasFocus) {
      setMenuHasFocus(false);
    }
  };
  return (
    <FlatList
      ref={flatListRef}
      data={items}
      keyExtractor={(item, index) => `item-${index}`}
      scrollEnabled={false}
      getItemLayout={(data, index) => ({
        length: laneHeightComputation,
        offset: laneHeightComputation * index,
        index,
      })}
      renderItem={({item, index: cIndex}) => (
        <View style={CarousalsStyles.item}>
          <Text style={CarousalsStyles.itemText}>{item.title}</Text>
          <FlatList
            ref={innerFlatListRef[cIndex]}
            data={Array(30).fill(0)}
            // snapToInterval={getScaledValue(80)}
            // snapToAlignment={'start'}
            keyExtractor={(item, index) => `card-${index}`}
            horizontal
            scrollEnabled={false}
            contentContainerStyle={{
              paddingRight: SCREEN_WIDTH,
              paddingLeft: 50,
            }}
            getItemLayout={(data, index) => ({
              length: cardWidth,
              offset: cardWidth * index,
              index,
            })}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={
                  index === currentCard &&
                  cIndex === currentLane &&
                  !menuHasFocus
                    ? {
                        ...CarousalsStyles.card,
                        borderWidth: 5,
                        borderColor: 'black',
                      }
                    : CarousalsStyles.card
                }
                ref={index === 0 && cIndex === 0 ? ref : null}
                onPress={goToDetails}
                onFocus={() => onCardFocus({cindex: cIndex, index: index})}>
                <Text> Card {index} </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    />
  );
});

const CarousalsStyles = StyleSheet.create({
  item: {},
  itemText: {
    color: 'black',
    fontSize: 20,
    marginVertical: 10,
  },
  card: {
    width: 160,
    height: 90,
    backgroundColor: '#007CFA',
    borderRadius: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Carousals;
