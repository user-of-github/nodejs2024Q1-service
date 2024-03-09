import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Put,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { TrackService } from './track.service';
import type { Track } from '../../types/Track';
import { UUIDParam } from '../../helpers/UUIDParam';
import { CreateTrackDto } from './dto/createTrack';
import { UpdateTrackDto } from './dto/updateTrack';

@Controller('track')
export class TrackController {
  @Inject(TrackService)
  private readonly trackService: TrackService;

  @Get()
  public async getTracks(): Promise<Track[]> {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  public async getTrack(@UUIDParam('id') id: string): Promise<Track> {
    return await this.trackService.getTrackById(id);
  }

  @Post()
  public async createTrack(@Body() dto: CreateTrackDto): Promise<Track> {
    return await this.trackService.createTrack(dto);
  }

  @Put(':id')
  public async updateTrack(
    @UUIDParam('id') id: string,
    @Body() dto: UpdateTrackDto,
  ): Promise<Track> {
    const validationResult = await validate(dto);

    if (validationResult.length > 0) {
      throw new BadRequestException();
    }

    return await this.trackService.updateTrack(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTrack(@UUIDParam('id') id: string): Promise<void> {
    return await this.trackService.deleteTrack(id);
  }
}
