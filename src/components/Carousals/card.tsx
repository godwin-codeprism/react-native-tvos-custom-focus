import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

interface Props {
  index: number;
  cIndex: number;
//   currentCard: number | null;
//   currentLane: number;
  onCardFocus: any;
  cardPress: any;
  ref: any;
}

const Card = (props: Props) => {
  const [focused, setFocused] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={
          //   props.index === props.currentCard &&
          //   props.cIndex === props.currentLane
          focused
            ? {
                ...styles.card,
                borderWidth: 5,
                borderColor: 'black',
              }
            : styles.card
        }
        ref={props.index === 0 && props.cIndex === 0 ? props.ref : null}
        onPress={props.cardPress}
        onFocus={() => {
          props.onCardFocus({cindex: props.cIndex, index: props.index});
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}>
        <Text> Card {props.index} </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.forwardRef(Card);

const styles = StyleSheet.create({
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
