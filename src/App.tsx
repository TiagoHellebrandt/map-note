import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import React, {useEffect} from 'react';
import {StatusBar, Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import MapProvider from './contexts/maps';

import Map from './screens/Map';
import Note from './screens/Note';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    async function requestPermission() {
      if (
        Platform.OS === 'android' &&
        !(await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ))
      ) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão para localização',
            message:
              'Para conseguir utilizar o aplicativo, é necessário permitir o acesso a localização',
            buttonNegative: 'Negar',
            buttonPositive: 'Permitir',
          },
        );
      } else if (Platform.OS === 'ios') {
        await Geolocation.requestAuthorization('whenInUse');
      }
    }
    requestPermission();
  }, []);

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
