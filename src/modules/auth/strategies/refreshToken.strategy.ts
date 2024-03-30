import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Req, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WithRefreshToken } from '../../../types/Auth';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  public constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_REFRESH_KEY'),
      passReqToCallback: true,
    });
  }

  public validate(@Req() req, payload: any): WithRefreshToken {
    const refreshToken = req.body.refreshToken;
    return { ...payload, refreshToken };
  }
}
