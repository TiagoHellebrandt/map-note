import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import React from 'react';
import {StatusBar} from 'react-native';

import MapProvider from './contexts/maps';

import Map from './screens/Map';
import Note from './screens/Note';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <MapProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="map"
            options={{header: () => <></>}}
            component={Map}
          />
          <Stack.Screen name="note" component={Note} />
        </Stack.Navigator>
      </NavigationContainer>
    </MapProvider>
  );
};

export default App;
