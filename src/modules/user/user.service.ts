import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { toResponseUser, User, type UserResponse } from '../../types/User';
import type { CreateUserDto } from './dto/createUser';
import type { UpdatePasswordDto } from './dto/updatePassword';


@Injectable()
export class UserService {
  @Inject(DatabaseService)
  private readonly databaseService: DatabaseService;

  public async getAllUsers(): Promise<UserResponse[]> {
    const allUsers = await this.databaseService.getUsers();
    return allUsers.map(toResponseUser);
  }

  public async getUserById(id: string): Promise<UserResponse> {
    const response = await this.databaseService.getUserById(id);
    if (!response) {
      throw new NotFoundException();
    }
    return toResponseUser(response);
  }

  public async getUserByLoginAndPassword(login: string, encryptedPassword: string): Promise<User> {
    return await this.databaseService.getUserByLoginAndPassword(login, encryptedPassword);
  }

  public async createUser(dto: CreateUserDto): Promise<UserResponse> {
    const createdUser = await this.databaseService.createUser(dto);
    return toResponseUser(createdUser);
  }

  public async updateUserPassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const user = await this.databaseService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User with such id does not exist');
    }

    if (user.password !== dto.oldPassword) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          error: 'Old password is wrong',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const newUser = await this.databaseService.updateUser(id, {
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: new Date(),
    });

    return toResponseUser(newUser);
  }

  public async deleteUser(id: string): Promise<void> {
    return await this.databaseService.deleteUser(id);
  }
}
