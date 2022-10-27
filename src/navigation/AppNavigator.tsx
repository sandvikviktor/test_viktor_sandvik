import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShowDetails from '../screens/ShowDetails';
import TvShows from '../screens/TvShows';
import {ShowsProvider} from '../providers/shows/ShowsProvider';

interface AppNavigatorProps {}

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC<AppNavigatorProps> = () => {
  return (
    <ShowsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={TvShows} />
          <Stack.Screen name="Episode" component={ShowDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </ShowsProvider>
  );
};

export default AppNavigator;