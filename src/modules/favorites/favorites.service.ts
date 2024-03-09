import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { FavoritesResponse } from '../../types/Favorites';
import type { Track } from '../../types/Track';
import type { Artist } from '../../types/Artist';
import type { Album } from '../../types/Album';

@Injectable()
export class FavoritesService {
  @Inject(DatabaseService)
  private readonly databaseService: DatabaseService;

  public async getAllFavorites(): Promise<FavoritesResponse> {
    const favorites = await this.databaseService.getFavorites();

    const promises: [Promise<Track[]>, Promise<Artist[]>, Promise<Album[]>] = [
      this.databaseService.getTracksByIds(favorites.tracks),
      this.databaseService.getArtistsByIds(favorites.artists),
      this.databaseService.getAlbumsByIds(favorites.albums),
    ];

    const [tracks, artists, albums] = await Promise.all(promises);

    return { tracks, artists, albums };
  }

  public async addTrackToFavorites(id: string): Promise<void> {
    let track: Track | null = null;

    try {
      track = await this.databaseService.getTrack(id);
    } catch {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Track not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!track) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Track not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.databaseService.addTrackToFavorites(track.id);
  }

  public async removeTrackFromFavorites(id: string): Promise<void> {
    return await this.databaseService.removeTrackFromFavorites(id);
  }
}
