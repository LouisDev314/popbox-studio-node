import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { pg } from '../db';

type AdvisoryLockResult = {
  acquired: boolean;
};

type AdvisoryUnlockResult = {
  released: boolean;
};

type ReservedConnection = Awaited<ReturnType<typeof pg.reserve>>;

export type AdvisoryLockHandle = {
  connection: ReservedConnection;
  lockKey: bigint;
};

const toBigIntKey = (key: string): bigint => {
  let hash = 0xcbf29ce484222325n; // FNV-1a 64-bit offset basis
  const prime = 0x100000001b3n;

  for (let i = 0; i < key.length; i += 1) {
    hash ^= BigInt(key.charCodeAt(i));
    hash = BigInt.asIntN(64, hash * prime);
  }

  return hash;
};

const createLockDb = (connection: ReservedConnection) => drizzle(connection);

export const tryAcquireAdvisoryLock = async (key: string): Promise<AdvisoryLockHandle | null> => {
  const lockKey = toBigIntKey(key);
  const connection = await pg.reserve();
  const lockDb = createLockDb(connection);

  try {
    const result = await lockDb.execute<AdvisoryLockResult>(sql`select pg_try_advisory_lock(${lockKey}) as acquired`);

    if (!result[0]?.acquired) {
      await connection.release();
      return null;
    }

    return {
      connection,
      lockKey,
    };
  } catch (error) {
    await connection.release();
    throw error;
  }
};

export const releaseAdvisoryLock = async (handle: AdvisoryLockHandle): Promise<void> => {
  const lockDb = createLockDb(handle.connection);

  try {
    const result = await lockDb.execute<AdvisoryUnlockResult>(
      sql`select pg_advisory_unlock(${handle.lockKey}) as released`,
    );

    if (!result[0]?.released) {
      throw new Error('Advisory lock was not held on the reserved connection');
    }
  } finally {
    await handle.connection.release();
  }
};
