// https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
// https://docs.nestjs.com/security/authentication#enable-authentication-globally
// https://docs.nestjs.com/recipes/passport

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule, UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
