import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';
import postgres from 'postgres';
import getEnvConfig from '../config/env';
import * as schema from './schema';
import logger from '../utils/logger';

const MAIN_DB_POOL_SIZE = 10;
const ADVISORY_LOCK_DB_POOL_SIZE = 4;
const DB_CONNECT_TIMEOUT_SECONDS = 5;
const DB_IDLE_TIMEOUT_SECONDS = 20;
const ADVISORY_LOCK_DB_IDLE_TIMEOUT_SECONDS = 10;
const DEFAULT_DB_VERIFY_TIMEOUT_MS = 3000;

const { databaseUrl } = getEnvConfig();

const isSupabasePoolerUrl = (connectionString: string) => {
  try {
    const url = new URL(connectionString);

    return (
      url.hostname.includes('pooler.supabase.com') ||
      url.port === '6543' ||
      url.searchParams.get('pgbouncer') === 'true'
    );
  } catch {
    return false;
  }
};

const shouldUsePreparedStatements = !isSupabasePoolerUrl(databaseUrl);

const createPostgresClient = (options: {
  max: number;
  idleTimeoutSeconds: number;
}) => {
  return postgres(databaseUrl, {
    max: options.max,
    idle_timeout: options.idleTimeoutSeconds,
    connect_timeout: DB_CONNECT_TIMEOUT_SECONDS,
    prepare: shouldUsePreparedStatements,
  });
};

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number, timeoutMessage: string): Promise<T> => {
  let timeoutHandle: NodeJS.Timeout | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeoutHandle = setTimeout(() => {
          reject(new Error(timeoutMessage));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
  }
};

export const pg = createPostgresClient({
  max: MAIN_DB_POOL_SIZE,
  idleTimeoutSeconds: DB_IDLE_TIMEOUT_SECONDS,
});

export const advisoryLockPg = createPostgresClient({
  max: ADVISORY_LOCK_DB_POOL_SIZE,
  idleTimeoutSeconds: ADVISORY_LOCK_DB_IDLE_TIMEOUT_SECONDS,
});

export const db = drizzle(pg, {
  schema,
});

export const verifyDatabaseConnection = async (timeoutMs = DEFAULT_DB_VERIFY_TIMEOUT_MS) => {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured');
  }

  await withTimeout(
    pg`select 1`,
    timeoutMs,
    `Database verification timed out after ${timeoutMs}ms`,
  );
};

export const pgStop = async () => {
  await Promise.all([pg.end(), advisoryLockPg.end()]);
  logger.info('Server disconnected from Supabase');
};

export const pgInit = async (timeoutMs = DEFAULT_DB_VERIFY_TIMEOUT_MS) => {
  await verifyDatabaseConnection(timeoutMs);
};

export { sql, schema };
