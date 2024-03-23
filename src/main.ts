import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = Number(process.env.PORT);

  if (Number.isNaN(port)) {
    throw new Error('No port provided in .env');
  }
  console.log('RUNNING')

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
