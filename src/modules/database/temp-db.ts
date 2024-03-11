import type { User } from '../../types/User';
import type { Artist } from '../../types/Artist';
import type { Favorites } from '../../types/Favorites';
import type { Track } from '../../types/Track';
import type { Album } from '../../types/Album';

export interface DatabaseType {
  users: User[];
  artists: Artist[];
  favorites: Favorites;
  tracks: Track[];
  albums: Album[];
}

export type IndexedDbEntityName = Exclude<keyof DatabaseType, 'favorites'>;
export type IndexedDbEntity = User | Artist | Track | Album;

export type IndexedFavoritesEntityName = Exclude<
  keyof DatabaseType,
  'favorites' | 'users'
>;

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
  artists: [
    {
      id: '9f691ac1-f565-14c5-9dae-a36e5b0e5ea3',
      name: 'Snoop Dogg',
      grammy: true,
    },
    {
      id: '9f691ac1-f565-14c5-9dae-a63e5b8e5ea3',
      name: 'Arianna Grande',
      grammy: true,
    },
  ],
  favorites: {
    tracks: ['9f961ac1-f655-41c5-9dae-a36e5b0e5ea0'],
    albums: [],
    artists: [
      '9f691ac1-f565-14c5-9dae-a36e5b0e5ea3',
      '9f691ac1-f565-14c5-9dae-a63e5b8e5ea3',
    ],
  },
  tracks: [
    {
      id: '9f961ac1-f655-41c5-9dae-a36e5b0e5ea0',
      artistId: null,
      albumId: null,
      duration: 123,
      name: 'Song !!!',
    },
  ],
  albums: [
    {
      artistId: '9f691ac1-f565-14c5-9dae-a36e5b0e5ea3',
      name: 'Doggy Style',
      id: '9f169ac1-f866-55c5-9dae-a36e0b0e5ea0',
      year: 2006,
    },
  ],
};
