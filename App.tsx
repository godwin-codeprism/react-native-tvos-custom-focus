import React, { } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './src/pages/detailsScreen'
import HomeScreen from './src/pages/homeScreen'
import SearchScreen from './src/pages/searchScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    /// wrap the app in a navigation container
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Search' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen as () => JSX.Element} />
        <Stack.Screen name="Search" component={SearchScreen as () => JSX.Element} />
        <Stack.Screen name="Details" component={DetailsScreen as () => JSX.Element} options={{
          animation:"none"
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export type RootStackParamList = {
  Home: {};
  Details: {};
}