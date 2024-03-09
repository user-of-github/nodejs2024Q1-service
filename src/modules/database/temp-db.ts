import type { User } from '../../types/User';
import type { Artist } from '../../types/Artist';
import type { Favorites } from '../../types/Favorites';
import type { Track } from '../../types/Track';
import type { Album } from '../../types/Album';

export interface DatabaseType {
  users: User[];
  artists: Artist[];
  favorites: Favorites[];
  tracks: Track[];
  albums: Album[];
}

export type IndexedDbEntityName = Exclude<keyof DatabaseType, 'favorites'>;
export type IndexedDbEntity = User | Artist | Track | Album;

export const TempDb: DatabaseType = {
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
  tracks: [
    {
      id: '9f961ac1-f655-41c5-9dae-a36e5b0e5ea0',
      artistId: null,
      albumId: null,
      duration: 123,
      name: 'Song !!!',
    },
  ],
  albums: [],
};
