import {
  type INestApplication,
  Injectable,
  NotFoundException,
  type OnModuleInit,
  type OnModuleDestroy
} from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client'
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
export class DatabaseService extends PrismaClient implements OnModuleInit , OnModuleDestroy {
  private readonly database: DatabaseType;

  public constructor() {
    super();
    this.database = TempDbForTest;
  }

  public async onModuleInit(): Promise<void> {
    await this.$connect();
    console.log('DB Module init');
  }

  public async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    console.log('DB Module destroy');
  }

  public async enableShutdownHooks(app: INestApplication): Promise<void> {
    console.log('before app exit');
    await app.close();
  }

  public async getUsers(): Promise<User[]> {
    console.log('FIND USERS')
    const user = await this.user.create({
      data: {
        login: 'Kek',
        password: 'Shrek',
        id: randomUUID(),
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
        version: 1
      }
    });
    return await this.user.findMany() as any;
  }

  public async getUserById(id: string): Promise<User> {
    // return this.user.findUnique({
    //   where: {
    //     id: id
    //   }
    // });
    return (await this.findEntityById('user', id)) as User;
  }

  public async createUser(dto: CreateUserDto): Promise<User> {
    const now = new Date();

    const newUser: User = {
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
      login: dto.login,
      password: dto.password,
      version: 1,
    };

    this.database.user.push(newUser);

    return newUser;
  }

  public async updateUser(id: string, newData: Partial<User>): Promise<User> {
    const userIndex = this.database.user.findIndex((user) => user.id === id);
    if (userIndex < 0) {
      throw new NotFoundException();
    }
    this.database.user[userIndex] = {
      ...this.database.user[userIndex],
      ...newData,
    };

    return this.database.user[userIndex];
  }

  public async deleteUser(id: string): Promise<void> {
    await this.deleteEntityById('user', id);
  }

  public async getTracks(): Promise<Track[]> {
    return this.database.track;
  }

  public async getTrack(id: string): Promise<Track> {
    return (await this.findEntityById('track', id)) as Track;
  }

  public async getTracksByIds(ids: string[]): Promise<Track[]> {
    return await this.getEntitiesByIds<Track>(ids, this.getTrack.bind(this));
  }

  public async createTrack(dto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: randomUUID(),
      ...dto,
    };

    this.database.track.push(newTrack);

    return newTrack;
  }

  public async updateTrack(
    id: string,
    newData: Partial<Track>,
  ): Promise<Track> {
    const index = this.database.track.findIndex((track) => track.id === id);
    if (index < 0) {
      throw new NotFoundException();
    }
    this.database.track[index] = {
      ...this.database.track[index],
      ...newData,
    };

    return this.database.track[index];
  }

  public async deleteTrack(id: string): Promise<void> {
    await this.deleteEntityById('track', id);
    this.database.favorites.track = this.database.favorites.track.filter(
      (trackId) => trackId !== id,
    );
  }

  public async getArtists(): Promise<Artist[]> {
    return this.database.artist;
  }

  public async getArtist(id: string): Promise<Artist> {
    return (await this.findEntityById('artist', id)) as Artist;
  }

  public async getArtistsByIds(ids: string[]): Promise<Artist[]> {
    return await this.getEntitiesByIds<Artist>(ids, this.getArtist.bind(this));
  }

  public async createArtist(dto: ArtistDto): Promise<Artist> {
    const newArtist: Artist = {
      id: randomUUID(),
      ...dto,
    };

    this.database.artist.push(newArtist);

    return newArtist;
  }

  public async updateArtist(
    id: string,
    newData: Partial<Artist>,
  ): Promise<Artist> {
    const index = this.database.artist.findIndex((artist) => artist.id === id);
    if (index < 0) {
      throw new NotFoundException();
    }
    this.database.artist[index] = {
      ...this.database.artist[index],
      ...newData,
    };

    return this.database.artist[index];
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.deleteEntityById('artist', id);

    this.database.track.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.database.album.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    this.database.favorites.artist = this.database.favorites.artist.filter(
      (artistId) => artistId !== id,
    );
  }

  public async getAlbums(): Promise<Album[]> {
    return this.database.album;
  }

  public async getAlbum(id: string): Promise<Album> {
    return (await this.findEntityById('album', id)) as Album;
  }

  public async getAlbumsByIds(ids: string[]): Promise<Album[]> {
    return await this.getEntitiesByIds<Album>(ids, this.getAlbum.bind(this));
  }

  public async createAlbum(dto: AlbumDto): Promise<Album> {
    const newAlbum: Album = {
      id: randomUUID(),
      ...dto,
    };

    this.database.album.push(newAlbum);

    return newAlbum;
  }

  public async updateAlbum(
    id: string,
    newData: Partial<Album>,
  ): Promise<Album> {
    const index = this.database.album.findIndex((album) => album.id === id);
    if (index < 0) {
      throw new NotFoundException();
    }
    this.database.album[index] = {
      ...this.database.album[index],
      ...newData,
    };

    return this.database.album[index];
  }

  public async deleteAlbum(id: string): Promise<void> {
    await this.deleteEntityById('album', id);

    this.database.track.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    this.database.favorites.album = this.database.favorites.album.filter(
      (albumId) => albumId !== id,
    );
  }

  public async getFavorites(): Promise<Favorites> {
    return this.database.favorites;
  }

  public async addTrackToFavorites(id: string): Promise<void> {
    if (!this.database.favorites.track.includes(id)) {
      this.database.favorites.track.push(id);
    }
  }

  public async removeTrackFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('track', id);
  }

  async addAlbumToFavorites(id: string) {
    if (!this.database.favorites.album.includes(id)) {
      this.database.favorites.album.push(id);
    }
  }

  public async removeAlbumFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('album', id);
  }

  public async addArtistToFavorites(id: string): Promise<void> {
    if (!this.database.favorites.artist.includes(id)) {
      this.database.favorites.artist.push(id);
    }
  }

  public async removeArtistFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('artist', id);
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
