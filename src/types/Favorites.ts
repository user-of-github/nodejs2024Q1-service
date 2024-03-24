import type { Artist } from './Artist';
import type { Album } from './Album';
import type { Track } from './Track';

export interface Favorites {
  artist: string[]; // favorite artists ids
  album: string[]; // favorite albums ids
  track: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artist: Artist[];
  album: Album[];
  track: Track[];
}
