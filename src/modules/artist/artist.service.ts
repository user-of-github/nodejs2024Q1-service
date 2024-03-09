import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { ArtistDto } from './dto/artistDto';
import type { Artist } from '../../types/Artist';

@Injectable()
export class ArtistService {
  @Inject(DatabaseService)
  private readonly databaseService: DatabaseService;

  public async getAllArtists(): Promise<Artist[]> {
    return await this.databaseService.getArtists();
  }

  public async getArtistById(id: string): Promise<Artist> {
    return await this.databaseService.getArtist(id);
  }

  public async createArtist(dto: ArtistDto): Promise<Artist> {
    return await this.databaseService.createArtist(dto);
  }

  public async updateArtist(id: string, dto: ArtistDto): Promise<Artist> {
    return await this.databaseService.updateArtist(id, dto);
  }

  public async deleteArtist(id: string): Promise<void> {
    return await this.databaseService.deleteArtist(id);
  }
}
