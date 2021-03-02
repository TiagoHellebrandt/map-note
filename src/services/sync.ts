import axios from 'axios';

import {Note} from '../types';

export const syncNotes = async (notes: Note[]) => {
  const idsSync: string[] = [];

  const promises = notes
    .filter((note) => !note.isSync)
    .map(async (note) => {
      await axios
        .post(
          'https://hooks.zapier.com/hooks/catch/472009/09rj5z/?email_key=thellebrandtsilva@gmail.com',
          {
            latitude: note.latitude,
            longitude: note.longitude,
            annotation: note.note,
            datetime: note.date,
          },
        )
        .then(() => idsSync.push(note.id));
    });

  await Promise.all(promises);

  return idsSync;
};
