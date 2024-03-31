import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { CustomLoggerService } from './modules/logger/logger.service';

const bootstrap = async (): Promise<void> => {
  const port = Number(process.env.PORT);

  console.log('Database port: ', process.env.DATABASE_URL);

  if (Number.isNaN(port)) {
    throw new Error('No app port provided in .env file');
  }

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  app.useLogger(app.get(CustomLoggerService));
  app.useGlobalPipes(new ValidationPipe({ transform: true}));

  await app.listen(port);
}

bootstrap();
