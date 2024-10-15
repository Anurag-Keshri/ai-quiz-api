import pino from 'pino';
import { config } from '../config';

const logger = pino({
  level: config.logLevel || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss.l',
			ignore: 'pid,hostname',
    },
  },
});


export default logger;
