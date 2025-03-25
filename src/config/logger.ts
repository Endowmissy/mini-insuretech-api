import * as winston from 'winston';
import * as dotenv from 'dotenv';
dotenv.config();

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

let logConfiguration: { transports: any[]; format: any };

if (process.env.NODE_ENV !== 'development') {
  logConfiguration = {
    transports: [
      new winston.transports.Console({
        level: 'error',
        handleExceptions: true,
        format: winston.format.combine(winston.format.colorize()),
      }),
      new winston.transports.File({
        level: 'info',
        filename: 'logs/server.log',
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json(),
        ),
      }),
    ],
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
      }),
      winston.format.printf(
        (info: { level: any; timestamp: any; message: any }) =>
          `${info.level}: ${[info.timestamp]}: ${info.message}`,
      ),
    ),
  };
} else {
  logConfiguration = {
    transports: [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        format: winston.format.combine(winston.format.simple()),
      }),
      new winston.transports.File({
        level: 'info',
        filename: 'logs/server.log',
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json(),
        ),
      }),
    ],
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
      }),
      winston.format.printf(
        (info: { level: any; timestamp: any; message: any }) =>
          `${info.level}: ${[info.timestamp]}: ${info.message}`,
      ),
    ),
  };
}

const logger = winston.createLogger(logConfiguration);

// Extend the logger to include a stream property
(logger as any).stream = {
  write: (message: any) => {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message.trim());
  },
};

export default logger;
