import type { User } from '../types/User';
import type { Artist } from '../types/Artist';
import type { Favorites } from '../types/Favorites';
import type { Track } from '../types/Track';
import type { Album } from '../types/Album';

interface Database {
  users: User[];
  artists: Artist[];
  favorites: Favorites[];
  tracks: Track[];
  albums: Album[];
}

export const TempDb: Database = {
  users: [
    {
      id: '9f961ac1-f655-41c5-9dae-a36e5b0e5ea3',
      login: 'Test user',
      password: '12345',
      version: 0,
      createdAt: 1709924389352,
      updatedAt: 1709924389352,
    },
  ],
  artists: [],
  favorites: [],
  tracks: [],
  albums: [],
};
