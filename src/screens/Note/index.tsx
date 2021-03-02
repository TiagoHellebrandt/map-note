import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
import {View, Button, Text, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {useMap} from '../../contexts/maps';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import {format} from 'date-fns';

import {Container, Map, Input, Annotation, Details, InfoText} from './styles';

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
    if (!textNote) {
      Alert.alert(
        'Ops..',
        'Parece que você esqueceu de digitar a anotação, tente novamente.',
      );
      return;
    }

    const {latitude, longitude} = region;
    addNote({latitude, longitude, text: textNote});
    setTextNote('');
    navigation.goBack();
  }, [textNote, addNote, region, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.note ? 'Anotação' : 'Nova Anotação',
      headerRight: ({}) => {
        if (route.params?.note) {
          return null;
        }

        return (
          <View style={{marginRight: 20}}>
            <Button title="Salvar" onPress={saveHandler} />
          </View>
        );
      },
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
        {route.params?.note && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}>
            <Icon
              name="map-pin"
              size={30}
              color={route.params.note.isSync ? '#555' : '#61b15a'}
            />
          </Marker>
        )}
      </Map>
      {route.params?.note ? (
        <>
          <Details>
            <InfoText>
              <Icon name="calendar" size={20} />{' '}
              {format(
                new Date(route.params.note.date),
                "dd/MM/yyyy 'às' HH:mm",
              )}
            </InfoText>
            {route.params.note.isSync && (
              <InfoText>
                <Icon name="cloud" size={20} /> Sincronizado
              </InfoText>
            )}
          </Details>
          <Annotation>{textNote}</Annotation>
        </>
      ) : (
        <Input
          placeholder="Escreva aqui sua anotação..."
          value={textNote}
          onChangeText={(txt) => setTextNote(txt)}
          multiline
          textAlignVertical="top"
        />
      )}
    </Container>
  );
};

export default Note;
