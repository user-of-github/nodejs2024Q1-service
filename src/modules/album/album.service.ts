import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { Album } from '../../types/Album';
import type { AlbumDto } from './dto/album';

@Injectable()
export class AlbumService {
  @Inject(DatabaseService)
  private readonly databaseService: DatabaseService;

  public async getAllAlbums(): Promise<Album[]> {
    return await this.databaseService.getAlbums();
  }

  public async getAlbumById(id: string): Promise<Album> {
    return await this.databaseService.getAlbum(id);
  }

  public async createAlbum(dto: AlbumDto): Promise<Album> {
    return await this.databaseService.createAlbum(dto);
  }

  public async updateAlbum(id: string, dto: AlbumDto): Promise<Album> {
    return await this.databaseService.updateAlbum(id, dto);
  }

  public async deleteAlbum(id: string): Promise<void> {
    return await this.databaseService.deleteAlbum(id);
  }
}
