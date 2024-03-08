import { Controller, Get, Inject } from '@nestjs/common';
import type { DatabaseService } from '../database/database.service';
import type { User } from '../types/User';

@Controller('users')
export class UserController {
  public constructor(@Inject() private readonly databaseService: DatabaseService) {}

  @Get()
  public async getAll(): Promise<User[]> {
    return await this.databaseService.getUsers();
  }
}
