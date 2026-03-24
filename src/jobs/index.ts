import cron, { type ScheduledTask } from 'node-cron';
import logger from '../utils/logger';
import { cleanupExpiredPendingOrders, cleanupExpiredReservations, type BackgroundJobRunResult } from './helpers';
import { type AdvisoryLockHandle, releaseAdvisoryLock, tryAcquireAdvisoryLock } from './advisory-lock';

type JobFn<T extends BackgroundJobRunResult = BackgroundJobRunResult> = () => Promise<T>;

type JobDefinition<T extends BackgroundJobRunResult = BackgroundJobRunResult> = {
  name: string;
  schedule: string;
  lockKey: string;
  job: JobFn<T>;
};

const runningJobs = new Set<string>();

const runJob = async <T extends BackgroundJobRunResult>(definition: JobDefinition<T>) => {
  const { name, lockKey, job } = definition;

  if (runningJobs.has(name)) {
    logger.warn({ job: name }, 'Skipping job because previous run is still in progress');
    return;
  }

  runningJobs.add(name);
  const startedAt = Date.now();
  let lockHandle: AdvisoryLockHandle | null = null;

  try {
    lockHandle = await tryAcquireAdvisoryLock(lockKey);

    if (!lockHandle) {
      logger.info(
        {
          job: name,
          lockKey,
          claimedCount: 0,
          processedCount: 0,
          durationMs: Date.now() - startedAt,
        },
        'Skipping job because advisory lock was not acquired',
      );
      return;
    }

    logger.info({ job: name }, 'Background job started');

    const result = await job();
    const { claimedCount, processedCount, ...details } = result;

    logger.info(
      {
        job: name,
        claimedCount,
        processedCount,
        durationMs: Date.now() - startedAt,
        details,
      },
      'Background job completed',
    );
  } catch (error) {
    logger.error(
      {
        err: error,
        error: error instanceof Error ? error.message : 'Unknown background job error',
        job: name,
        durationMs: Date.now() - startedAt,
      },
      'Background job failed',
    );
  } finally {
    if (lockHandle) {
      try {
        await releaseAdvisoryLock(lockHandle);
      } catch (unlockError) {
        logger.error(
          {
            err: unlockError,
            error: unlockError instanceof Error ? unlockError.message : 'Unknown advisory unlock error',
            job: name,
            lockKey,
          },
          'Failed to release advisory lock',
        );
      }
    }

    runningJobs.delete(name);
  }
};

export const startBackgroundJobs = () => {
  const jobs: JobDefinition[] = [
    {
      name: 'cleanupExpiredReservations',
      schedule: '*/2 * * * *',
      lockKey: 'jobs:cleanupExpiredReservations',
      job: cleanupExpiredReservations,
    },
    {
      name: 'cleanupExpiredPendingOrders',
      schedule: '*/10 * * * *',
      lockKey: 'jobs:cleanupExpiredPendingOrders',
      job: cleanupExpiredPendingOrders,
    },
  ];

  const tasks: ScheduledTask[] = jobs.map((definition) =>
    cron.schedule(
      definition.schedule,
      () => {
        void runJob(definition);
      },
      {
        timezone: 'UTC',
      },
    ),
  );

  logger.info(
    {
      jobs: jobs.map(({ name, schedule }) => ({ name, schedule })),
    },
    'Background jobs scheduled',
  );

  return () => {
    for (const task of tasks) {
      void task.stop();
    }

    logger.info('Background jobs stopped');
  };
};
