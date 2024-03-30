import {
  type INestApplication,
  Injectable,
  NotFoundException,
  type OnModuleDestroy,
  type OnModuleInit, UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { User } from '../../types/User';
import type { Album } from '../../types/Album';
import type { Artist } from '../../types/Artist';
import type { Track } from '../../types/Track';
import type { FavoritesResponse } from '../../types/Favorites';
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
import { convertFavoritesSubItem } from '../../helpers/utils';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{

  public constructor() {
    super();
  }

  public async onModuleInit(): Promise<void> {
    await this.$connect();
    console.log('Database Module init');
  }

  public async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    console.log('Database Module destroy');
  }

  public async enableShutdownHooks(app: INestApplication): Promise<void> {
    console.log('Before app exit');
    await app.close();
  }

  public async getUsers(): Promise<User[]> {
    return await this.user.findMany();
  }

  public async getUserById(id: string): Promise<User> {
    return (await this.findEntityById('user', id)) as User;
  }

  public async getUserByLogin(login: string): Promise<User | null> {
    let user: User;

    try {
      user = await this.user.findFirst({
        where: {
          login: login
        }
      });
    } catch {
      throw new NotFoundException();
    }

    return user;
  }

  public async createUser(dto: CreateUserDto): Promise<User> {
    const now = new Date();

    return await this.user.create({
      data: {
        id: randomUUID(),
        createdAt: now,
        updatedAt: now,
        login: dto.login,
        password: dto.password,
        version: 1,
      },
    });
  }

  public async updateUser(id: string, newData: Partial<User>): Promise<User> {
    return await this.updateEntityById('user', id, newData);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.deleteEntityById('user', id);
  }

  public async getTracks(): Promise<Track[]> {
    return await this.track.findMany();
  }

  public async getTrack(id: string): Promise<Track> {
    return (await this.findEntityById('track', id)) as Track;
  }

  public async getTracksByIds(ids: string[]): Promise<Track[]> {
    return await this.getEntitiesByIds<Track>(ids, this.getTrack.bind(this));
  }

  public async createTrack(dto: CreateTrackDto): Promise<Track> {
    return await this.track.create({
      data: { ...dto, id: randomUUID() },
    });
  }

  public async updateTrack(
    id: string,
    newData: Partial<Track>,
  ): Promise<Track> {
    return await this.updateEntityById<Track>('track', id, newData);
  }

  public async deleteTrack(id: string): Promise<void> {
    await this.deleteEntityById('track', id);
  }

  public async getArtists(): Promise<Artist[]> {
    return await this.artist.findMany();
  }

  public async getArtist(id: string): Promise<Artist> {
    return (await this.findEntityById('artist', id)) as Artist;
  }

  public async getArtistsByIds(ids: string[]): Promise<Artist[]> {
    return await this.getEntitiesByIds<Artist>(ids, this.getArtist.bind(this));
  }

  public async createArtist(dto: ArtistDto): Promise<Artist> {
    return await this.artist.create({
      data: {
        id: randomUUID(),
        ...dto,
      },
    });
  }

  public async updateArtist(
    id: string,
    newData: Partial<Artist>,
  ): Promise<Artist> {
    return await this.updateEntityById<Artist>('artist', id, newData);
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.deleteEntityById('artist', id);

    await this.track.updateMany({
      where: {
        artistId: id,
      },
      data: {
        artistId: null,
      },
    });

    await this.album.updateMany({
      where: {
        artistId: id,
      },
      data: {
        artistId: null,
      },
    });
  }

  public async getAlbums(): Promise<Album[]> {
    return await this.album.findMany();
  }

  public async getAlbum(id: string): Promise<Album> {
    return (await this.findEntityById('album', id)) as Album;
  }

  public async getAlbumsByIds(ids: string[]): Promise<Album[]> {
    return await this.getEntitiesByIds<Album>(ids, this.getAlbum.bind(this));
  }

  public async createAlbum(dto: AlbumDto): Promise<Album> {
    return await this.album.create({
      data: {
        id: randomUUID(),
        ...dto,
      },
    });
  }

  public async updateAlbum(
    id: string,
    newData: Partial<Album>,
  ): Promise<Album> {
    return await this.updateEntityById<Album>('album', id, newData);
  }

  public async deleteAlbum(id: string): Promise<void> {
    await this.deleteEntityById('album', id);

    await this.track.updateMany({
      where: {
        albumId: id,
      },
      data: {
        albumId: null,
      },
    });
  }

  public async getFavorites(): Promise<FavoritesResponse> {
    const art = await this.artist.findMany({
      where: { isFavorite: true },
    });
    const alb = await this.album.findMany({
      where: { isFavorite: true },
    });
    const tr = await this.track.findMany({
      where: { isFavorite: true },
    });

    // TODO: hack, will be removed in future, when implementing auth

    const artists = convertFavoritesSubItem<Artist>(art);
    const albums = convertFavoritesSubItem<Album>(alb);
    const tracks = convertFavoritesSubItem<Track>(tr);

    return { artists, albums, tracks };
  }

  public async addTrackToFavorites(id: string): Promise<void> {
    await this.updateEntityById<Track>('track', id, { isFavorite: true });
  }

  public async removeTrackFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('track', id);
  }

  public async addAlbumToFavorites(id: string) {
    await this.updateEntityById<Album>('album', id, { isFavorite: true });
  }

  public async removeAlbumFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('album', id);
  }

  public async addArtistToFavorites(id: string): Promise<void> {
    await this.updateEntityById<Artist>('artist', id, { isFavorite: true });
    await this.artist.update({
      where: { id: id },
      data: { isFavorite: true },
    });
  }

  public async removeArtistFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('artist', id);
  }

  private async removeEntityFromFavorites(
    entityKey: IndexedFavoritesEntityName,
    id: string,
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this[entityKey].update({
      where: { id: id },
      data: { isFavorite: false },
    });
  }

  private async findEntityById(
    entity: IndexedDbEntityName,
    id: string,
  ): Promise<IndexedDbEntity> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const item = await this[entity].findUnique({
      where: {
        id: id,
      },
    });

    if (!item) {
      throw new NotFoundException('No entity with such id exists');
    }

    return item;
  }

  private async deleteEntityById(
    entity: IndexedDbEntityName,
    id: string,
  ): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this[entity].delete({
        where: {
          id: id,
        },
      });
    } catch {
      throw new NotFoundException();
    }
  }

  private async updateEntityById<
    ValueType extends User | Album | Artist | Track,
  >(
    entity: IndexedDbEntityName,
    id: string,
    newData: Partial<ValueType>,
  ): Promise<ValueType> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await this[entity].update({
        where: {
          id: id,
        },
        data: newData,
      });
    } catch {
      throw new NotFoundException();
    }
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
