import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { FavoritesResponse } from '../../types/Favorites';
import type { Track } from '../../types/Track';
import type { Artist } from '../../types/Artist';
import type { Album } from '../../types/Album';
import { UnprocessableEntityError } from '../../helpers/errors';
import type { IndexedDbEntity } from '../database/temp-db';

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
    return await this.addEntityToFavorites<Track>(
      id,
      this.databaseService.getTrack.bind(this.databaseService),
      this.databaseService.addTrackToFavorites.bind(this.databaseService),
      'Track',
    );
    /*let track: Track | null = null;

    try {
      track = await this.databaseService.getTrack(id);
    } catch {
      throw UnprocessableEntityError('Track not found');
    }

    if (!track) {
      throw UnprocessableEntityError('Track not found');
    }

    return await this.databaseService.addTrackToFavorites(track.id);*/
  }

  public async removeTrackFromFavorites(id: string): Promise<void> {
    return await this.databaseService.removeTrackFromFavorites(id);
  }

  public async addAlbumToFavorites(id: string): Promise<void> {
    return await this.addEntityToFavorites<Album>(
      id,
      this.databaseService.getAlbum.bind(this.databaseService),
      this.databaseService.addAlbumToFavorites.bind(this.databaseService),
      'Album',
    );
    /*let album: Album | null = null;

    try {
      album = await this.databaseService.getAlbum(id);
    } catch {
      throw UnprocessableEntityError('Album not found');
    }

    if (!album) {
      throw UnprocessableEntityError('Album not found');
    }

    return await this.databaseService.addAlbumToFavorites(album.id);*/
  }

  public async removeAlbumFromFavorites(id: string): Promise<void> {
    return await this.databaseService.removeAlbumFromFavorites(id);
  }

  public async addArtistToFavorites(id: string): Promise<void> {
    return await this.addEntityToFavorites<Artist>(
      id,
      this.databaseService.getArtist.bind(this.databaseService),
      this.databaseService.addArtistToFavorites.bind(this.databaseService),
      'Artist',
    );
    /*let artist: Artist | null = null;

    try {
      artist = await this.databaseService.getArtist(id);
    } catch {
      throw UnprocessableEntityError('Artist not found');
    }

    if (!artist) {
      throw UnprocessableEntityError('Artist not found');
    }

    return await this.databaseService.addArtistToFavorites(artist.id);*/
  }

  public async removeArtistFromFavorites(id: string): Promise<void> {
    return await this.databaseService.removeArtistFromFavorites(id);
  }

  private async addEntityToFavorites<ValueType extends IndexedDbEntity>(
    id: string,
    getter: (id: string) => Promise<ValueType>,
    adderToFavorites: (id: string) => Promise<void>,
    entityName?: string,
  ): Promise<void> {
    let entity: ValueType | null = null;

    try {
      entity = await getter(id);
    } catch {
      throw UnprocessableEntityError(`${entityName} not found`);
    }

    if (!entity) {
      throw UnprocessableEntityError(`${entityName} not found`);
    }

    return await adderToFavorites(entity.id);
  }
}
