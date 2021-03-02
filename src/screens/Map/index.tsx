import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useMap} from '../../contexts/maps';
import {StackScreenProps} from '@react-navigation/stack';

import FloatingButton from '../../components/FloatingButton';

const Map: React.FC<StackScreenProps<{}>> = ({navigation}) => {
  const {notes} = useMap();

  return (
    <>
      <MapView style={styles.map} showsUserLocation>
        {notes.map((note, index) => (
          <Marker
            key={index}
            coordinate={{latitude: note.latitude, longitude: note.longitude}}
            title="Anotação"
            description={note.note}
            onPress={() => navigation.navigate('note', {note})}
          />
        ))}
      </MapView>
      <FloatingButton label="+" onPress={() => navigation.navigate('note')} />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
