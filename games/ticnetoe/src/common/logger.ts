import winston from 'winston';
import Config from '@src/config';

const logger = winston.createLogger({
  level: Config.LOG_LEVEL,
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

export default logger;