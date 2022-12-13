import { View, Text, requireNativeComponent, NativeModules } from 'react-native'
import React, { useEffect } from 'react'
import SearchViewTVOS from '../components/Search/SearchView';

type Props = {}

const SearchScreen = (props: Props) => {
  useEffect(() => {
    console.log('SearchScreen mounted', SearchViewTVOS);
  }, []);
  return (
      <SearchViewTVOS style={{backgroundColor:'grey', with: '100%', height: '100%'}} />
  )
}  

export default SearchScreen