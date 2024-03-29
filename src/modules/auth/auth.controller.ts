import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service';
import { LogInDto } from './dto/signIn';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async logIn(@Body() dto: LogInDto) {
    console.log('DTO', dto)
    return this.authService.logIn(dto.login, dto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  public getProfile(@Request() req) {
    return req.user;
  }
}
