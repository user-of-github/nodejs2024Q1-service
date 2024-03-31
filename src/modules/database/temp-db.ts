import type { User } from '../../types/User';
import type { Artist } from '../../types/Artist';
import type { Favorites } from '../../types/Favorites';
import type { Track } from '../../types/Track';
import type { Album } from '../../types/Album';

export interface DatabaseType {
  user: User[];
  artist: Artist[];
  favorites: Favorites;
  track: Track[];
  album: Album[];
}

export type IndexedDbEntityName = Exclude<keyof DatabaseType, 'favorites'>;
export type IndexedDbEntity = User | Artist | Track | Album;

export type IndexedFavoritesEntityName = Exclude<keyof DatabaseType, 'favorites' | 'user'>;

export const TempDbForTest: DatabaseType = {
  user: [],
  artist: [],
  favorites: {
    track: [],
    artist: [],
    album: [],
  },
  track: [],
  album: [],
};

export const TempDb: DatabaseType = {
  user: [
    {
      id: '9f961ac1-f655-41c5-9dae-a36e5b0e5ea3',
      login: 'Test user',
      password: '12345',
      version: 0,
      createdAt: new Date(1709924389352),
      updatedAt: new Date(1709924389352),
    },
  ],
  artist: [
    {
      id: '9f691ac1-f565-14c5-9dae-a36e5b0e5ea3',
      name: 'Snoop Dogg',
      grammy: true,
      isFavorite: false,
    },
    {
      id: '9f691ac1-f565-14c5-9dae-a63e5b8e5ea3',
      name: 'Arianna Grande',
      grammy: true,
      isFavorite: false,
    },
  ],
  favorites: {
    track: ['9f961ac1-f655-41c5-9dae-a36e5b0e5ea0'],
    album: [],
    artist: ['9f691ac1-f565-14c5-9dae-a36e5b0e5ea3', '9f691ac1-f565-14c5-9dae-a63e5b8e5ea3'],
  },
  track: [
    {
      id: '9f961ac1-f655-41c5-9dae-a36e5b0e5ea0',
      artistId: null,
      albumId: null,
      duration: 123,
      name: 'Song !!!',
      isFavorite: false,
    },
  ],
  album: [
    {
      artistId: '9f691ac1-f565-14c5-9dae-a36e5b0e5ea3',
      name: 'Doggy Style',
      id: '9f169ac1-f866-55c5-9dae-a36e0b0e5ea0',
      year: 2006,
      isFavorite: false,
    },
  ],
};
