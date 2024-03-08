import { type INestApplication, Injectable } from '@nestjs/common';
import type { User } from '../types/User';
import type { Album } from '../types/Album';
import type { Artist } from '../types/Artist';
import type { Track } from '../types/Track';
import type { Favorites } from '../types/Favorites';
import { TempDb } from './temp-db';

@Injectable()
export class DatabaseService {
  public async onModuleInit(): Promise<void> {
    console.log('DB Module init');
  }

  public async onModuleDestroy(): Promise<void> {
    console.log('DB Module destroy');
  }

  public async enableShutdownHooks(app: INestApplication): Promise<void> {
    console.log('before app exit');
    await app.close();
  }
  public async getUsers(): Promise<User[]> {
    return TempDb.users;
  }

  public async getAlbums(): Promise<Album[]> {
    return TempDb.albums;
  }

  public async getArtists(): Promise<Artist[]> {
    return TempDb.artists;
  }

  public async getTracks(): Promise<Track[]> {
    return TempDb.tracks;
  }

  public async getFavorites(): Promise<Favorites[]> {
    return TempDb.favorites;
  }
}
