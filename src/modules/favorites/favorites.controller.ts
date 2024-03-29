import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import type { FavoritesResponse } from '../../types/Favorites';
import { FavoritesService } from './favorites.service';
import { UUIDParam } from '../../helpers/UUIDParam';

@Controller('favs')
export class FavoritesController {
  @Inject(FavoritesService)
  private readonly favoritesService: FavoritesService;

  @Get()
  public async getAllFavorites(): Promise<FavoritesResponse> {
    return await this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  public async addTrackToFavorites(@UUIDParam('id') id: string): Promise<void> {
    return await this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async removeTrackFromFavorites(
    @UUIDParam('id') id: string,
  ): Promise<void> {
    return await this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  public async addAlbumToFavorites(@UUIDParam('id') id: string): Promise<void> {
    return await this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async removeAlbumFromFavorites(
    @UUIDParam('id') id: string,
  ): Promise<void> {
    return await this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  public async addArtistToFavorites(
    @UUIDParam('id') id: string,
  ): Promise<void> {
    return await this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async removeArtistFromFavorites(
    @UUIDParam('id') id: string,
  ): Promise<void> {
    return await this.favoritesService.removeArtistFromFavorites(id);
  }
}
