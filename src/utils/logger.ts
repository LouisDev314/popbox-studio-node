import pino from 'pino';
import getEnvConfig from '../config/env';

const { nodeEnv, logLevel } = getEnvConfig();

const isProd = nodeEnv === 'production';

const logger = pino({
  level: logLevel || 'info',

  base: {
    env: nodeEnv,
    service: 'popbox-studio-node',
  },

  timestamp: pino.stdTimeFunctions.isoTime,

  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.headers["set-cookie"]',
      'res.headers["set-cookie"]',
      'authorization',
      'cookie',
      'password',
      'token',
      'accessToken',
      'refreshToken',
      'apiKey',
      'secret',
    ],
    censor: '[REDACTED]',
  },

  formatters: {
    level(label) {
      return { level: label };
    },
  },

  ...(!isProd
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            singleLine: false,
          },
        },
      }
    : {}),
});

export default logger;
