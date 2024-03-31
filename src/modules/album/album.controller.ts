import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Post, Put } from '@nestjs/common';
import type { Album } from '../../types/Album';
import { UUIDParam } from '../../helpers/UUIDParam';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album';

@Controller('album')
export class AlbumController {
  @Inject(AlbumService)
  private readonly albumService: AlbumService;

  @Get()
  public async getAlbums(): Promise<Album[]> {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  public async getAlbum(@UUIDParam('id') id: string): Promise<Album> {
    return await this.albumService.getAlbumById(id);
  }

  @Post()
  public async createAlbum(@Body() dto: AlbumDto): Promise<Album> {
    return await this.albumService.createAlbum(dto);
  }

  @Put(':id')
  public async updateAlbum(@UUIDParam('id') id: string, @Body() dto: AlbumDto): Promise<Album> {
    return await this.albumService.updateAlbum(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAlbum(@UUIDParam('id') id: string): Promise<void> {
    return await this.albumService.deleteAlbum(id);
  }
}
