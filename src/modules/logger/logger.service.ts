import * as path from 'node:path';
import * as fs from 'node:fs';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type LogTypeName = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  private static readonly logFileExtension = 'log';
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
  private readonly logFileMaxSizeBytes: number;

  public constructor(private readonly configService: ConfigService) {
    super();
    this.logsFilePath = path.resolve(__dirname, '../../../', configService.get('LOGS_FILE_PATH'));
    this.errorsFilePath = path.resolve(__dirname, '../../../', configService.get('LOGS_ERRORS_FILE_PATH'));

    this.loggingLevel = Number(configService.get('LOGGING_LEVEL') || 0);
    this.logFileMaxSizeBytes = Number(configService.get('LOGS_FILE_MAX_SIZE_KB') || 512) * 1024;
  }

  public log(message, ...optionalParams): void {
    if (!this.doesNeedLog('log')) {
      return;
    }

    this.logToFile('log', message);

    super.log(message, ...optionalParams);
  }

  public error(message, ...optionalParams): void {
    if (!this.doesNeedLog('error')) {
      return;
    }

    this.logToFile('error', message);

    super.error(message, ...optionalParams);
  }

  public warn(message, ...optionalParams): void {
    if (!this.doesNeedLog('warn')) {
      return;
    }

    this.logToFile('warn', message);

    super.warn(message, ...optionalParams);
  }

  public debug(message, ...optionalParams): void {
    if (!this.doesNeedLog('debug')) {
      return;
    }

    this.logToFile('debug', message);

    super.debug(message, ...optionalParams);
  }

  public verbose(message, ...optionalParams): void {
    if (!this.doesNeedLog('verbose')) {
      return;
    }

    this.logToFile('verbose', message);

    super.verbose(message, ...optionalParams);
  }

  private doesNeedLog(logTypeName: LogTypeName): boolean {
    return CustomLoggerService.levels[logTypeName] <= this.loggingLevel;
  }

  private logToFile(loggingLevel: LogTypeName, messageText: string): void {
    const filePath = loggingLevel !== 'error' ? this.logsFilePath : this.errorsFilePath;
    const message = `${new Date().toISOString()} | ${messageText}`;
    const writeLog = (): void => {
      fs.appendFile(filePath, message + '\n', { encoding: 'utf-8' }, (error) => {
        if (error) {
          throw error;
        }
      });
    };

    // Important! Best practise: Logging must not block base thread
    // @TODO: check if callbacks solve this problem (instead of using await)
    fs.stat(filePath, (error, stats) => {
      if (error) {
        throw error;
      }

      // Log file Rotation: https://en.wikipedia.org/wiki/Log_rotation
      if (stats.size >= this.logFileMaxSizeBytes) {
        const newPath = filePath.replace(`.${CustomLoggerService.logFileExtension}`, `-rotated-${new Date().getTime()}.log`);

        fs.rename(filePath, newPath, (error) => {
          if (error) {
            throw error;
          } else {
            writeLog();
          }
        });
      } else {
        writeLog();
      }
    });
  }
}
