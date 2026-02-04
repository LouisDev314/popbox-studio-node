import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import getEnvConfig from '../config/env';
import logger from '../config/logger';

const adapter = new PrismaPg({
  connectionString: getEnvConfig().databaseUrl, // your Supabase transaction pooler URL
});

export const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});

export const postgresInit = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    logger.info('Server connected to Supabase');
  } catch (err) {
    // keeping your internal log is fine
    logger.error('Server connection to Supabase failed', err);
    throw err;
  }
};

export const postgresStop = async () => {
  await prisma.$disconnect();
  logger.info('Server disconnected from Supabase gracefully');
};
