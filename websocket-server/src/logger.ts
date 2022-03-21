import  { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const loggerFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const logger = createLogger({
  level: 'debug',
  transports:  new transports.Console({
    format: combine(
      timestamp(),
      loggerFormat
    ),
  })
});
