import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
import {View, Button, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {useMap} from '../../contexts/maps';
import {Marker} from 'react-native-maps';

import {Container, Map, Input} from './styles';

const Note: React.FC<StackScreenProps<RootStackParamList, 'note'>> = ({
  navigation,
  route,
}) => {
  const [region, setRegion] = useState({latitude: 0, longitude: 0});
  const [textNote, setTextNote] = useState(
    () => route.params?.note?.note || '',
  );
  const {addNote} = useMap();

  const saveHandler = useCallback(() => {
    const {latitude, longitude} = region;
    addNote({latitude, longitude, text: textNote});
    setTextNote('');
    navigation.goBack();
  }, [textNote, addNote, region, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.note ? 'Anotação' : 'Nova Anotação',
      headerRight: ({}) => (
        <View style={{marginRight: 20}}>
          <Button
            title="Salvar"
            onPress={saveHandler}
            disabled={!!route.params?.note}
          />
        </View>
      ),
    });
  }, [navigation, saveHandler, route.params]);

  useEffect(() => {
    if (route.params?.note) {
      setRegion({
        latitude: route.params.note.latitude,
        longitude: route.params.note.longitude,
      });
    } else {
      Geolocation.getCurrentPosition(
        (position) => {
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          Alert.alert(
            'Ocorreu um erro',
            'Não foi possível obter sua localização.',
          );
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [route.params, textNote]);

  return (
    <Container>
      <Map
        showsUserLocation
        followsUserLocation
        zoomEnabled={false}
        scrollEnabled={false}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}>
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
      </Map>
      <Input
        placeholder="Escreva aqui sua anotação..."
        value={textNote}
        onChangeText={(txt) => setTextNote(txt)}
        multiline
        editable={!route.params?.note}
        textAlignVertical="top"
      />
    </Container>
  );
};

export default Note;
