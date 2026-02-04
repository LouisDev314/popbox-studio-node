import Redis from 'ioredis';
import getEnvConfig from '../../config/env';
import logger from '../../config/logger';
import Exception from '../../utils/Exception';
import { HttpStatusCode } from 'axios';

const redisUrl = getEnvConfig().redisUrl;
if (!redisUrl) {
  throw new Exception(HttpStatusCode.InternalServerError, 'REDIS_URL is missing');
}

export const redis = new Redis(redisUrl, {
  lazyConnect: true,
  enableReadyCheck: true,
  connectTimeout: 10_000, // 10s
  tls: {},
  // Default retry strategy
  // retryStrategy: (times) => {
  //   // 50ms, 100ms, 200ms... up to 2s
  //   return Math.min(times * 50, 2000);
  // },
});
redis.on('error', (err) => {
  logger.error('Redis connection failed or closed unexpectedly', err);
});

export const redisInit = async () => {
  try {
    await redis.connect();
    logger.info('Server connected to Redis');
  } catch (err) {
    logger.error('Redis error', err);
    throw err;
  }
};

export const redisStop = async () => {
  try {
    // quit() flushes pending commands; better for graceful shutdown
    await redis.quit();
    logger.info('Server disconnected from Redis');
  } catch (err) {
    logger.error('Redis quit failed, forcing disconnect', err);
    redis.disconnect();
  }
};
