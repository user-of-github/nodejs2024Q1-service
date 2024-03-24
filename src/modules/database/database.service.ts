import {
  type INestApplication,
  Injectable,
  NotFoundException,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { User } from '../../types/User';
import type { Album } from '../../types/Album';
import type { Artist } from '../../types/Artist';
import type { Track } from '../../types/Track';
import type { Favorites, FavoritesResponse } from '../../types/Favorites';
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

    const user = await this.user.create({
      data: newUser
    });

    return user;
  }

  public async updateUser(id: string, newData: Partial<User>): Promise<User> {
    // const userIndex = this.database.user.findIndex((user) => user.id === id);
    // if (userIndex < 0) {
    //   throw new NotFoundException();
    // }
    // this.database.user[userIndex] = {
    //   ...this.database.user[userIndex],
    //   ...newData,
    // };

    return await this.user.update({
      where: {
        id: id
      },
      data: newData
    });
  }

  public async deleteUser(id: string): Promise<void> {
    // await this.user.delete({
    //   where: {
    //     id: id
    //   }
    // });
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
    // const newTrack: Track = {
    //   id: randomUUID(),
    //   ...dto,
    // };
    //
    // this.database.track.push(newTrack);
    //
    // return newTrack;

    return await this.track.create({
      data: { ...dto, id: randomUUID() }
    });
  }

  public async updateTrack(
    id: string,
    newData: Partial<Track>,
  ): Promise<Track> {
    // const index = this.database.track.findIndex((track) => track.id === id);
    // if (index < 0) {
    //   throw new NotFoundException();
    // }
    // this.database.track[index] = {
    //   ...this.database.track[index],
    //   ...newData,
    // };
    //
    // return this.database.track[index];
    const updatedTrack: Track = await this.track.update({
      where: {
        id: id
      },
      data: newData
    });
    return updatedTrack;
  }

  public async deleteTrack(id: string): Promise<void> {
    await this.deleteEntityById('track', id);
    // this.database.favorites.track = this.database.favorites.track.filter(
    //   (trackId) => trackId !== id,
    // );


    // await this.track.updateMany({
    //   where: {
    //     id
    //   }
    // })
  }

  public async getArtists(): Promise<Artist[]> {
    return await this.artist.findMany()
  }

  public async getArtist(id: string): Promise<Artist> {
    return (await this.findEntityById('artist', id)) as Artist;
  }

  public async getArtistsByIds(ids: string[]): Promise<Artist[]> {
    return await this.getEntitiesByIds<Artist>(ids, this.getArtist.bind(this));
  }

  public async createArtist(dto: ArtistDto): Promise<Artist> {
    // const newArtist: Artist = {
    //   id: randomUUID(),
    //   ...dto,
    // };
    //
    // this.database.artist.push(newArtist);
    //
    // return newArtist;
    const newArtist = this.artist.create({
      data: {
        id: randomUUID(),
        ...dto
      }
    });

    return newArtist;
  }

  public async updateArtist(
    id: string,
    newData: Partial<Artist>,
  ): Promise<Artist> {
    // const index = this.database.artist.findIndex((artist) => artist.id === id);
    // if (index < 0) {
    //   throw new NotFoundException();
    // }
    // this.database.artist[index] = {
    //   ...this.database.artist[index],
    //   ...newData,
    // };
    //
    // return this.database.artist[index];

    const updatedArtist: Artist = await this.artist.update({
      where: {
        id: id
      },
      data: newData
    });
    return updatedArtist;
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.deleteEntityById('artist', id);

    // this.database.track.forEach((track) => {
    //   if (track.artistId === id) {
    //     track.artistId = null;
    //   }
    // });
    //
    // this.database.album.forEach((album) => {
    //   if (album.artistId === id) {
    //     album.artistId = null;
    //   }
    // });
    //
    // this.database.favorites.artist = this.database.favorites.artist.filter(
    //   (artistId) => artistId !== id,
    // );

    await this.track.updateMany({
      where: {
        artistId: id
      },
      data: {
        artistId: null
      }
    });

    await this.album.updateMany({
      where: {
        artistId: id
      },
      data: {
        artistId: null
      }
    });

    // await this.favoritesArtists.deleteMany({
    //   where: {
    //     artists: {
    //       has: id
    //     }
    //   }
    // });
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
    // const newAlbum: Album = {
    //   id: randomUUID(),
    //   ...dto,
    // };
    //
    // this.database.album.push(newAlbum);
    const newAlbum = await this.album.create({
      data: {
        id: randomUUID(), ...dto
      }
    });

    return newAlbum;
  }

  public async updateAlbum(
    id: string,
    newData: Partial<Album>,
  ): Promise<Album> {
    // const index = this.database.album.findIndex((album) => album.id === id);
    // if (index < 0) {
    //   throw new NotFoundException();
    // }
    // this.database.album[index] = {
    //   ...this.database.album[index],
    //   ...newData,
    // };
    //
    // return this.database.album[index];
    const updatedAlbum = await this.album.update({
      where: {
        id: id
      },
      data: newData
    });

    return updatedAlbum;
  }

  public async deleteAlbum(id: string): Promise<void> {
    await this.deleteEntityById('album', id);

    // this.database.track.forEach((track) => {
    //   if (track.albumId === id) {
    //     track.albumId = null;
    //   }
    // });
    //
    // this.database.favorites.album = this.database.favorites.album.filter(
    //   (albumId) => albumId !== id,
    // );

    await this.track.updateMany({
      where: {
        albumId: id
      },
      data: {
        albumId: null
      }
    });

    // await this.favoritesAlbums.deleteMany({
    //   where: {
    //     albums: {
    //       has: id
    //     }
    //   }
    // });
  }

  public async getFavorites(): Promise<FavoritesResponse> {
    type WithId = { id: string };
    const extractId = (item: WithId): string => item.id;
    const convert = (items: WithId[]): string[] => items.map(extractId);

    const artists = await this.artist.findMany({
      where: {
        isFavorite: true
      }
    });
    const albums = await this.album.findMany({
      where: {
        isFavorite: true
      }
    });
    const tracks = await this.track.findMany({
      where: {
        isFavorite: true
      }
    });

    return {artists, albums, tracks};
  }

  public async addTrackToFavorites(id: string): Promise<void> {
    await this.track.update({
      where: {
        id: id
      },
      data: {
        isFavorite: true
      }
    });


    // if (!this.database.favorites.track.includes(id)) {
    //   this.database.favorites.track.push(id);
    // }
  }

  public async removeTrackFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('track', id);
  }

  async addAlbumToFavorites(id: string) {
    // if (!this.database.favorites.album.includes(id)) {
    //   this.database.favorites.album.push(id);
    // }

    await this.album.update({
      where: {
        id: id
      },
      data: {
        isFavorite: true
      }
    });
  }

  public async removeAlbumFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('album', id);
  }

  public async addArtistToFavorites(id: string): Promise<void> {
    await this.artist.update({
      where: {
        id: id
      },
      data: {
        isFavorite: true
      }
    });
  }

  public async removeArtistFromFavorites(id: string): Promise<void> {
    return await this.removeEntityFromFavorites('artist', id);
  }

  private async removeEntityFromFavorites(
    entityKey: IndexedFavoritesEntityName,
    id: string,
  ): Promise<void> {
    // const index = this.database.favorites[entityKey].findIndex(
    //   (entity) => entity === id,
    // );
    //
    // if (index < 0) {
    //   throw new NotFoundException('Not in favorites');
    // }
    //
    // this.database.favorites[entityKey].splice(index, 1);

    // @ts-ignore
    await this[entityKey].update({
      where: {
        id: id
      },
      data: {
        isFavorite: false
      }
    });
  }

  private async findEntityById(
    entity: IndexedDbEntityName,
    id: string,
  ): Promise<IndexedDbEntity> {
    // @ts-ignore
    const item = await this[entity].findUnique({
      where: {
        id: id
      }
    });

    if (!item) {
      throw new NotFoundException('No entity with such id exists');
    }

    return item;
  }

  private async deleteEntityById(entity: IndexedDbEntityName, id: string): Promise<void> {
   try {
     // @ts-ignore
     await this[entity].delete({
       where: {
         id: id
       }
     });
   } catch {
     throw new NotFoundException();
   }

    // if (index < 0) {
    //   throw new NotFoundException();
    // }
    //
    // this.database[entity].splice(index, 1);
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
