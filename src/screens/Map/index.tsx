import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useMap} from '../../contexts/maps';
import {StackScreenProps} from '@react-navigation/stack';
import {syncNotes} from '../../services/sync';
import FloatingButton from '../../components/FloatingButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const Map: React.FC<StackScreenProps<{}>> = ({navigation}) => {
  const {notes, setNotes} = useMap();

  const syncHandler = useCallback(async () => {
    const ids = await syncNotes(notes);

    setNotes((prev) =>
      prev.map((note) => {
        if (ids.includes(note.id)) {
          return {
            ...note,
            isSync: true,
          };
        }

        return note;
      }),
    );
  }, [notes, setNotes]);

  return (
    <>
      <MapView style={styles.map} showsUserLocation>
        {notes.map((note, index) => (
          <Marker
            key={index}
            coordinate={{latitude: note.latitude, longitude: note.longitude}}
            title="Anotação"
            description={note.note}
            onPress={() => navigation.navigate('note', {note})}>
            <Icon
              name="map-pin"
              size={30}
              color={note.isSync ? '#555' : '#61b15a'}
            />
          </Marker>
        ))}
      </MapView>
      <FloatingButton icon="refresh" theme="secondary" onPress={syncHandler} />
      <FloatingButton icon="plus" onPress={() => navigation.navigate('note')} />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
