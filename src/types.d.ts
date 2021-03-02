export interface Note {
  id: string;
  note: string;
  date: string;
  latitude: number;
  longitude: number;
  isSync: boolean;
}

export type RootStackParamList = {
  map: undefined;
  note: {
    note?: Note;
  };
};
