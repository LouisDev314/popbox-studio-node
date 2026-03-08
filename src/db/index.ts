import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';
import postgres from 'postgres';
import getEnvConfig from '../config/env';
import * as schema from './schema';
import logger from '../utils/logger';

export const pg = postgres(getEnvConfig().databaseUrl, {
  max: 10,
  idle_timeout: 20,
});

export const db = drizzle(pg, {
  schema,
});

export const pgInit = async () => {
  if (!getEnvConfig().databaseUrl) {
    throw new Error('DATABASE_URL is not configured');
  }

  await pg`select 1`;
  logger.info('Server connected to Supabase');
};

export const pgStop = async () => {
  await pg.end();
  logger.info('Server disconnected from Supabase');
};

export { sql, schema };
