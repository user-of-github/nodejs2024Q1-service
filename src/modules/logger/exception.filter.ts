// https://docs.nestjs.com/exception-filters#exception-filters-1
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLoggerService } from './logger.service';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  public constructor(
    private readonly customLoggerService: CustomLoggerService,
  ) {}

  public catch(exception: any, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const response = context.getResponse<Response>();

    const message = this.getErrorMessage(request, status);

    this.customLoggerService.error(message);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private getErrorMessage(request: Request, status: number): string {
    let message = `${new Date().toISOString()} Internal Server Error (500) |`;

    message += `Code: ${status} , `;
    message += `${request.originalUrl} ${request.method} , `;
    message += `${JSON.stringify(request.params)} , ${JSON.stringify(
      request.body,
    )}`;

    return message;
  }
}
