import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const port = Number(process.env.PORT);

  console.log(process.env.DATABASE_URL);

  if (Number.isNaN(port)) {
    throw new Error('No port provided in .env file');
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
