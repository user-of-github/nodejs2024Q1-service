import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FavoritesService {
  @Inject(DatabaseService)
  private readonly databaseService: DatabaseService;
}
