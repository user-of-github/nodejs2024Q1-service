import * as path from 'node:path';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type LogTypeName = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  public static readonly levels: Record<LogTypeName, number> = {
    log: 0,
    error: 1,
    warn: 2,
    debug: 3,
    verbose: 4,
  } as const;

  private readonly logsFilePath: string;
  private readonly errorsFilePath: string;
  private readonly loggingLevel: number;

  public constructor(private readonly configService: ConfigService) {
    super();
    this.logsFilePath = path.resolve(__dirname, '../../../', configService.get('LOGS_FILE_PATH'));
    this.errorsFilePath = path.resolve(__dirname, '../../../', configService.get('LOGS_ERRORS_FILE_PATH'));

    this.loggingLevel = Number(configService.get('LOGGING_LEVEL') || 0);
  }

  public log(message, ...optionalParams): void {
    if (!this.doesNeedLog('log')) {
      return;
    }

    super.log(message, ...optionalParams);
  }

  public error(message, ...optionalParams): void {
    if (!this.doesNeedLog('error')) {
      return;
    }

    super.error(message, ...optionalParams);
  }

  public warn(message, ...optionalParams): void {
    if (!this.doesNeedLog('warn')) {
      return;
    }

    super.warn(message, ...optionalParams);
  }

  public debug(message, ...optionalParams): void {
    if (!this.doesNeedLog('debug')) {
      return;
    }

    super.debug(message, ...optionalParams);
  }

  public verbose(message, ...optionalParams): void {
    if (!this.doesNeedLog('verbose')) {
      return;
    }

    super.verbose(message, ...optionalParams);
  }

  private doesNeedLog(logTypeName: LogTypeName): boolean {
    return CustomLoggerService.levels[logTypeName] <= this.loggingLevel;
  }

  private logToFile(
    loggingLevel: LogTypeName,
    message: string,
  ): void {
    const filePath = loggingLevel === 'error' ? this.logsFilePath : this.errorsFilePath;
  }
}
