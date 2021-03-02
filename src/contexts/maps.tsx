import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';

import {MMKV} from 'react-native-mmkv';
import {v4 as uuidv4} from 'uuid';
import {Note} from '../types';

interface NoteInitialProps {
  latitude: number;
  longitude: number;
  text: string;
}

interface MapContextProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  addNote: (data: NoteInitialProps) => void;
}

const MapContext = createContext({} as MapContextProps);

const MapProvider: React.FC = ({children}) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = useCallback(async ({latitude, longitude, text}) => {
    const note: Note = {
      id: uuidv4(),
      note: text,
      date: new Date().toISOString(),
      latitude,
      longitude,
      isSync: false,
    };

    setNotes((prev) => [...prev, note]);
  }, []);

  useEffect(() => {
    let notesJSON = MMKV.getString('notes');

    if (notesJSON) {
      setNotes(JSON.parse(notesJSON));
    }
  }, []);

  useEffect(() => {
    MMKV.set('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <MapContext.Provider value={{notes, setNotes, addNote}}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  return useContext(MapContext);
};

export default MapProvider;
