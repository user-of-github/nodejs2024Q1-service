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
import { type DatabaseType, TempDb } from './temp-db';
import type { CreateUserDto } from '../user/dto/createUser';

@Injectable()
export class DatabaseService {
  private readonly database: DatabaseType;

  public constructor() {
    this.database = TempDb;
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

  public async getUserById(id: string): Promise<User | undefined> {
    return this.database.users.find((user) => user.id === id);
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
    const index = this.database.users.findIndex((user) => user.id === id);

    if (index < 0) {
      throw new NotFoundException();
    }

    this.database.users.splice(index, 1);
  }

  public async getAlbums(): Promise<Album[]> {
    return this.database.albums;
  }

  public async getArtists(): Promise<Artist[]> {
    return this.database.artists;
  }

  public async getTracks(): Promise<Track[]> {
    return this.database.tracks;
  }

  public async getFavorites(): Promise<Favorites[]> {
    return this.database.favorites;
  }
}
