import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { hash } from '../../helpers/utils';
import { UserResponse } from '../../types/User';
import { JWTPayloadRaw, TokenResponse } from '../../types/Auth';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dto/createUser';
import { LogInDto } from './dto/signIn';


@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signUp(createUserDto: CreateUserDto): Promise<UserResponse> {
    const userExists = await this.userService.getUserByLogin(createUserDto.login);
    if (userExists) {
      throw new BadRequestException('User with such login already exists');
    }

    const hashedPassword = hash(createUserDto.password);

    return await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  public async updateRefreshToken(oldRefreshToken: string): Promise<TokenResponse> {
    const payload = this.jwtService.decode(oldRefreshToken, {
      json: true
    });

    if (!payload) {
      throw new ForbiddenException('Invalid token');
    }

    const userId = (payload as any).userId;

    const user = await this.userService.getUserById(userId);

    if (oldRefreshToken !== user.refreshToken) {
      throw new ForbiddenException('Refresh token is not same as must be');
    }

    const tokens = await this.getTokens(userId, user.login);

    await this.userService.updateRefreshToken(userId, tokens.refreshToken);

    return tokens;
  }


  public async login(data: LogInDto): Promise<TokenResponse> {
    const user = await this.userService.getUserByLogin(data.login);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    if (user.password !== hash(data.password)) {
      throw new ForbiddenException('Password is incorrect');
    }

    const tokens = await this.getTokens(user.id, user.login);
    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private async getTokens(userId: string, login: string): Promise<TokenResponse> {
    const payload: JWTPayloadRaw = { userId, login };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
        expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
