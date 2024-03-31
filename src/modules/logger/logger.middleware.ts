import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public constructor(private readonly customLoggerService: CustomLoggerService) {}

  public use(request: Request, response: Response, next: NextFunction): void {
    const reqMessage = `Request: ${request.originalUrl} , ${request.method} , ${JSON.stringify(
      request.params,
    )} , ${JSON.stringify(request.body)}`;

    response.on('finish', () => {
      const resMessage = `, Response: ${response.statusCode} ${response.statusMessage}`;
      this.customLoggerService.log(`${reqMessage} ${resMessage}`);
    });

    next();
  }
}
