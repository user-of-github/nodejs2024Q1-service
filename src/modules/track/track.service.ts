import { Inject, Injectable } from '@nestjs/common';
import type { Track } from '../../types/Track';
import { CreateTrackDto } from './dto/createTrack';
import { DatabaseService } from '../database/database.service';
import type { UpdateTrackDto } from './dto/updateTrack';

@Injectable()
export class TrackService {
  @Inject(DatabaseService)
  private readonly databaseService: DatabaseService;

  public async getAllTracks(): Promise<Track[]> {
    return await this.databaseService.getTracks();
  }

  public async getTrackById(id: string): Promise<Track> {
    return await this.databaseService.getTrack(id);
  }

  public async createTrack(dto: CreateTrackDto): Promise<Track> {
    return await this.databaseService.createTrack(dto);
  }

  public async updateTrack(id: string, dto: UpdateTrackDto): Promise<Track> {
    return await this.databaseService.updateTrack(id, dto);
  }

  public async deleteTrack(id: string): Promise<void> {
    return await this.databaseService.deleteTrack(id);
  }
}
