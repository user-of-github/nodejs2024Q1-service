import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Post, Put } from '@nestjs/common';
import type { UserResponse } from '../../types/User';
import { UUIDParam } from '../../helpers/UUIDParam';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser';
import { UpdatePasswordDto } from './dto/updatePassword';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get()
  public async getAll(): Promise<UserResponse[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  public async getUser(@UUIDParam('id') id: string): Promise<UserResponse> {
    return await this.userService.getUserById(id);
  }

  @Post()
  public async createUser(@Body() dto: CreateUserDto): Promise<UserResponse> {
    return await this.userService.createUser(dto);
  }

  @Put(':id')
  public async updateUserPassword(@UUIDParam('id') id: string, @Body() dto: UpdatePasswordDto): Promise<UserResponse> {
    return await this.userService.updateUserPassword(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(@UUIDParam('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
