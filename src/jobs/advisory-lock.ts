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

export const tryAcquireAdvisoryLock = async (key: string): Promise<AdvisoryLockHandle | null> => {
  const lockKey = toBigIntKey(key);
  const connection = await pg.reserve();

  try {
    const result = await connection.unsafe<AdvisoryLockResult[]>('select pg_try_advisory_lock($1) as acquired', [
      lockKey.toString(),
    ]);

    if (!result[0]?.acquired) {
      connection.release();
      return null;
    }

    return {
      connection,
      lockKey,
    };
  } catch (error) {
    connection.release();
    throw error;
  }
};

export const releaseAdvisoryLock = async (handle: AdvisoryLockHandle): Promise<void> => {
  try {
    const result = await handle.connection.unsafe<AdvisoryUnlockResult[]>('select pg_advisory_unlock($1) as released', [
      handle.lockKey.toString(),
    ]);

    if (!result[0]?.released) {
      throw new Error('Advisory lock was not held on the reserved connection');
    }
  } finally {
    handle.connection.release();
  }
};
