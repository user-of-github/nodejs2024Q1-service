import { Controller, Get, Inject, Module } from '@nestjs/common';
import type { User } from '../types/User';
import { DatabaseService } from '../database/database.service';
import { DatabaseModule } from '../database/database.module';

@Controller('users')
export class UserController {
  @Inject(DatabaseService)
  private readonly databaseService: DatabaseService;

  @Get()
  public async getAll(): Promise<User[]> {
    return await this.databaseService.getUsers();
  }
}
