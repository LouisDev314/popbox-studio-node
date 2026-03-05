import pino from 'pino';
import getEnvConfig from '../config/env';

const config = getEnvConfig();
const logger = pino({
  level: config.logLevel || 'info',
  ...(config.nodeEnv !== 'production' && {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  }),
});

export default logger;
