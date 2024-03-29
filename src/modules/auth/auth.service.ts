import { Get, Injectable, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { hash } from '../../helpers/utils';
import { JwtService } from '@nestjs/jwt';
import { LogInResponse } from '../../types/Auth';
import { AuthGuard } from './auth.guard';


@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async logIn(login: string, password: string): Promise<LogInResponse> {
    const encryptedPassword = hash(password);
    const user = await this.userService.getUserByLoginAndPassword(login, encryptedPassword);
    const payload = { sub: user.id, login: user.login } as const;

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken
    };
  }
}
