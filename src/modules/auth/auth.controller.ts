import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req): Promise<any> {
    return await this.authService.login(req.user);
  }
}
