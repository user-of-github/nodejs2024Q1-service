import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { hash } from '../../helpers/utils';
import { User } from '../../types/User';


@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}


  public async validateUser(login: string, password: string): Promise<User> {
    const user = await this.userService.getUserByLogin(login);
    const encryptedPassword = hash(password);

    if (user && user.password === encryptedPassword) {
      return user;
    }

    throw new UnauthorizedException('Incorrect login or password');
  }

  public async login(user: User) {
    const payload = { login: user.login, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
