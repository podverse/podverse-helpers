import { config } from '@helpers/config';
import { createLogger, format, transports } from 'winston';
import * as TransportStream from 'winston-transport';
import * as fs from 'fs';
import * as path from 'path';

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return stack ? `${timestamp} [${level}]: ${message} - ${stack}` : `${timestamp} [${level}]: ${message}`;
});

const logDir = config.logging.logDir;
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export const logger = createLogger({
  level: config.logLevel,
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        logFormat
      )
    }),
    new transports.File({
      filename: path.join(logDir, 'info.log'),
      level: 'info',
      format: combine(
        timestamp(),
        logFormat
      )
    }),
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: combine(
        timestamp(),
        logFormat
      )
    })
  ]
});

export const addRemoteTransport = (transport: TransportStream) => {
  logger.add(transport);
};

export const logError = (error: Error) => {
  logger.error(error.message, { stack: error.stack });
};
