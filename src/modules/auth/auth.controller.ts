import { Body, Controller, Get, HttpCode, Post, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser';
import { TokenResponse } from '../../types/Auth';
import { UserResponse } from '../../types/User';
import { LogInDto } from './dto/signIn';
import { PublicRoute } from './public-route.decorator';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Post('login')
  public async login(@Body() data: LogInDto): Promise<TokenResponse> {
    return await this.authService.login(data);
  }

  @PublicRoute()
  @Post('signup')
  public async signup(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return await this.authService.signUp(createUserDto);
  }

  @PublicRoute()
  @Post('refresh')
  @HttpCode(200)
  public async refresh(@Request() request): Promise<TokenResponse> {
    if (!request.body.refreshToken) {
      throw new UnauthorizedException();
    }
    return await this.authService.updateRefreshToken(request.body.refreshToken);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
