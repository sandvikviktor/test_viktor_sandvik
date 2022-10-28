import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShowDetails from '../screens/ShowDetails';
import TvShows from '../screens/TvShows';

interface AppNavigatorProps {}

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC<AppNavigatorProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="TvShows" component={TvShows} />
        <Stack.Screen name="ShowDetails" component={ShowDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
