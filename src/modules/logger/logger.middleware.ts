import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { CustomLoggerService } from './logger.service';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public constructor(private readonly customLoggerService: CustomLoggerService) {}

  public use(request: Request, response: Response, next: NextFunction): void {
    const message = `Request: ${request.originalUrl} , ${request.method} , ${JSON.stringify(request.params)} , ${JSON.stringify(request.body)}`;
    this.customLoggerService.log(message);
    next();
  }
}