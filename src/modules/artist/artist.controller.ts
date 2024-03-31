import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Post, Put } from '@nestjs/common';
import { UUIDParam } from '../../helpers/UUIDParam';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist';
import type { Artist } from '../../types/Artist';

@Controller('artist')
export class ArtistController {
  @Inject(ArtistService)
  private readonly artistService: ArtistService;

  @Get()
  public async getArtists(): Promise<Artist[]> {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  public async getArtist(@UUIDParam('id') id: string): Promise<Artist> {
    return await this.artistService.getArtistById(id);
  }

  @Post()
  public async createArtist(@Body() dto: ArtistDto): Promise<Artist> {
    return await this.artistService.createArtist(dto);
  }

  @Put(':id')
  public async updateArtist(@UUIDParam('id') id: string, @Body() dto: ArtistDto): Promise<Artist> {
    return await this.artistService.updateArtist(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteArtist(@UUIDParam('id') id: string): Promise<void> {
    return await this.artistService.deleteArtist(id);
  }
}
