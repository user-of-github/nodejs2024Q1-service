import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseService } from '../database/database.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [DatabaseService],
  exports: [UserController],
})
export class UserModule {}
