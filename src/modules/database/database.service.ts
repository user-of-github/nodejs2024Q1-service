import {
  type INestApplication,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { User } from '../../types/User';
import type { Album } from '../../types/Album';
import type { Artist } from '../../types/Artist';
import type { Track } from '../../types/Track';
import type { Favorites } from '../../types/Favorites';
import {
  type DatabaseType,
  type IndexedDbEntity,
  type IndexedDbEntityName,
  type IndexedFavoritesEntityName,
  TempDbForTest,
} from './temp-db';
import type { CreateUserDto } from '../user/dto/createUser';
import type { CreateTrackDto } from '../track/dto/createTrack';
import type { ArtistDto } from '../artist/dto/artist';
import type { AlbumDto } from '../album/dto/album';

@Injectable()
export class DatabaseService {
  private readonly database: DatabaseType;

  public constructor() {
    this.database = TempDbForTest;
  }

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
    return this.database.users;
  }

  public async getUserById(id: string): Promise<User> {
    return (await this.findEntityById('users', id)) as User;
  }

  public async createUser(dto: CreateUserDto): Promise<User> {
    const now = Date.now();

    const newUser: User = {
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
      login: dto.login,
      password: dto.password,
      version: 1,
    };

    this.database.users.push(newUser);

    return newUser;
  }

  public async updateUser(id: string, newData: Partial<User>): Promise<User> {
    const userIndex = this.database.users.findIndex((user) => user.id === id);
    if (userIndex < 0) {
      throw new NotFoundException();
    }
    this.database.users[userIndex] = {
      ...this.database.users[userIndex],
      ...newData,
    };

    return this.database.users[userIndex];
  }

  public async deleteUser(id: string): Promise<void> {
    await this.deleteEntityById('users', id);
  }

  public async getTracks(): Promise<Track[]> {
    return this.database.tracks;
  }

  public async getTrack(id: string): Promise<Track> {
    return (await this.findEntityById('tracks', id)) as Track;
  }

  public async getTracksByIds(ids: string[]): Promise<Track[]> {
    return await this.getEntitiesByIds<Track>(ids, this.getTrack.bind(this));
  }

  public async createTrack(dto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: randomUUID(),
      ...dto,
    };

    this.database.tracks.push(newTrack);

    return newTrack;
  }

  public async updateTrack(
    id: string,
    newData: Partial<Track>,
  ): Promise<Track> {
    const index = this.database.tracks.findIndex((track) => track.id === id);
    if (index < 0) {
      throw new NotFoundException();
    }
    this.database.tracks[index] = {
      ...this.database.tracks[index],
      ...newData,
    };

    return this.database.tracks[index];
  }

  public async deleteTrack(id: string): Promise<void> {
    await this.deleteEntityById('tracks', id);
    this.database.favorites.tracks = this.database.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  public async getArtists(): Promise<Artist[]> {
    return this.database.artists;
  }

  public async getArtist(id: string): Promise<Artist> {
    return (await this.findEntityById('artists', id)) as Artist;
  }

  public async getArtistsByIds(ids: string[]): Promise<Artist[]> {
    return await this.getEntitiesByIds<Artist>(ids, this.getArtist.bind(this));
  }

  public async createArtist(dto: ArtistDto): Promise<Artist> {
    const newArtist: Artist = {
      id: randomUUID(),
      ...dto,
    };

    this.database.artists.push(newArtist);

    return newArtist;
  }

  public async updateArtist(
    id: string,
    newData: Partial<Artist>,
  ): Promise<Artist> {
    const index = this.database.artists.findIndex((artist) => artist.id === id);
    if (index < 0) {
      throw new NotFoundException();
    }
    this.database.artists[index] = {
      ...this.database.artists[index],
      ...newData,
    };

    return this.database.artists[index];
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.deleteEntityById('artists', id);

    this.database.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.database.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    this.database.favorites.artists = this.database.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }

  public async getAlbums(): Promise<Album[]> {
    return this.database.albums;
  }

  public async getAlbum(id: string): Promise<Album> {
    return (await this.findEntityById('albums', id)) as Album;
  }

  public async getAlbumsByIds(ids: string[]): Promise<Album[]> {
    return await this.getEntitiesByIds<Album>(ids, this.getAlbum.bind(this));
  }

  public async createAlbum(dto: AlbumDto): Promise<Album> {
    const newAlbum: Album = {
      id: randomUUID(),
      ...dto,
    };

    this.database.albums.push(newAlbum);

    return newAlbum;
  }

  public async updateAlbum(
    id: string,
    newData: Partial<Album>,
  ): Promise<Album> {
    const index = this.database.albums.findIndex((album) => album.id === id);
    if (index < 0) {
      throw new NotFoundException();
    }
    this.database.albums[index] = {
      ...this.database.albums[index],
      ...newData,
    };

    return this.database.albums[index];
  }

  public async deleteAlbum(id: string): Promise<void> {
    await this.deleteEntityById('albums', id);

    this.database.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    this.database.favorites.albums = this.database.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  public async getFavorites(): Promise<Favorites> {
    return this.database.favorites;
  }

  public async addTrackToFavorites(id: string): Promise<void> {
    if (!this.database.favorites.tracks.includes(id)) {
      this.database.favorites.tracks.push(id);
    }
  }

  public async removeTrackFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('tracks', id);
  }

  async addAlbumToFavorites(id: string) {
    if (!this.database.favorites.albums.includes(id)) {
      this.database.favorites.albums.push(id);
    }
  }

  public async removeAlbumFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('albums', id);
  }

  public async addArtistToFavorites(id: string): Promise<void> {
    if (!this.database.favorites.artists.includes(id)) {
      this.database.favorites.artists.push(id);
    }
  }

  public async removeArtistFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('artists', id);
  }

  private async removeEntityFromFavorites(
    entityKey: IndexedFavoritesEntityName,
    id: string,
  ): Promise<void> {
    const index = this.database.favorites[entityKey].findIndex(
      (entity) => entity === id,
    );

    if (index < 0) {
      throw new NotFoundException('Not in favorites');
    }

    this.database.favorites[entityKey].splice(index, 1);

    return;
  }

  private async findEntityById(
    entity: IndexedDbEntityName,
    id: string,
  ): Promise<IndexedDbEntity> {
    const item = this.database[entity].findIndex((unit) => unit.id === id);

    if (item < 0) {
      throw new NotFoundException('No entity with such id exists');
    }

    return this.database[entity][item];
  }

  private async deleteEntityById(
    entity: IndexedDbEntityName,
    id: string,
  ): Promise<void> {
    const index = this.database[entity].findIndex((entity) => entity.id === id);

    if (index < 0) {
      throw new NotFoundException();
    }

    this.database[entity].splice(index, 1);
  }

  private async getEntitiesByIds<ValueType>(
    ids: string[],
    getter: (id: string) => Promise<ValueType>,
  ): Promise<ValueType[]> {
    //TODO: FIX ERROR IN PROMISES ERROR
    const data: ValueType[] = [];

    for (const id of ids) {
      const value = await getter(id);
      data.push(value);
    }

    return data;
  }
}
