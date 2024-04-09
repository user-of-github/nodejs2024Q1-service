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
    bufferLogs: true,
  });

  const logger = app.get(CustomLoggerService);

  process.on('uncaughtException', (err, origin) => {
    logger.error(`Uncaught Exception: ${err.message}`);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Exception: ${JSON.stringify(reason)}`);
  });

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
};

bootstrap();
