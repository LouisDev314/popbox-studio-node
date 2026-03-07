import logger from '../utils/logger';
import { cleanupExpiredPendingOrders, cleanupExpiredReservations } from '../services/checkout';

type JobHandle = ReturnType<typeof setInterval>;

const runSafely = async (label: string, job: () => Promise<void>) => {
  try {
    await job();
  } catch (error) {
    logger.error({ error, job: label }, 'Background job failed');
  }
};

export const startBackgroundJobs = () => {
  const handles: JobHandle[] = [];

  handles.push(
    setInterval(() => {
      void runSafely('cleanupExpiredReservations', cleanupExpiredReservations);
    }, 2 * 60 * 1000),
  );

  handles.push(
    setInterval(() => {
      void runSafely('cleanupExpiredPendingOrders', cleanupExpiredPendingOrders);
    }, 10 * 60 * 1000),
  );

  return () => {
    for (const handle of handles) {
      clearInterval(handle);
    }
  };
};
