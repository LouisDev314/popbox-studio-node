import { Router } from 'express';
import { verifyDatabaseConnection } from '../../../db';

const healthRouter: Router = Router();
const READY_TIMEOUT_MS = 3000;

healthRouter.head('/health', (_req, res) => {
  return res.status(200).end();
});

healthRouter.get('/health', (_req, res) => {
  return res.send_ok('Healthy', {
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

healthRouter.head('/ready', async (_req, res) => {
  try {
    await verifyDatabaseConnection(READY_TIMEOUT_MS);
    return res.status(200).end();
  } catch {
    return res.status(503).end();
  }
});

healthRouter.get('/ready', async (_req, res) => {
  const startedAt = Date.now();

  try {
    await verifyDatabaseConnection(READY_TIMEOUT_MS);

    return res.send_ok('Ready', {
      durationMs: Date.now() - startedAt,
      timestamp: Date.now(),
      uptime: process.uptime(),
    });
  } catch {
    return res.send_serviceUnavailable('Not ready', {
      durationMs: Date.now() - startedAt,
      timeoutMs: READY_TIMEOUT_MS,
    });
  }
});

export default healthRouter;
