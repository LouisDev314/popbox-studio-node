import { Server } from 'http';
import type { Express } from 'express';
import getEnvConfig from './config/env';
import logger from './utils/logger';
import { pgInit, pgStop } from './db';
import { startBackgroundJobs } from './jobs';
import { initSentry } from './integrations/sentry';

/* -------------------------Setup variables------------------------- */
const { port } = getEnvConfig();
const HTTP_HOST = '0.0.0.0';
const DB_WARMUP_TIMEOUT_MS = 10000;
const HTTP_REQUEST_TIMEOUT_MS = 30000;
const HTTP_HEADERS_TIMEOUT_MS = 35000;
const HTTP_KEEP_ALIVE_TIMEOUT_MS = 5000;
initSentry();
let appPromise: Promise<Express> | null = null;
let server: Server | null = null;
let stopBackgroundJobs: (() => void) | null = null;
let isShuttingDown = false;

const toError = (error: unknown) => {
  if (error instanceof Error) {
    return error;
  }

  return new Error(typeof error === 'string' ? error : 'Unknown error');
};

const getApp = async () => {
  if (!appPromise) {
    appPromise = import('./app.js').then(({ createApp }) => createApp());
  }

  return appPromise;
};

/* -------------------------Init------------------------- */
const listen = async () => {
  logger.info({ host: HTTP_HOST, port }, 'Server boot begin');
  const app = await getApp();

  server = await new Promise<Server>((resolve, reject) => {
    const httpServer = app.listen(port, HTTP_HOST);
    const handleListen = () => {
      httpServer.off('error', handleError);
      httpServer.requestTimeout = HTTP_REQUEST_TIMEOUT_MS;
      httpServer.headersTimeout = HTTP_HEADERS_TIMEOUT_MS;
      httpServer.keepAliveTimeout = HTTP_KEEP_ALIVE_TIMEOUT_MS;
      logger.info({ host: HTTP_HOST, port }, 'HTTP listen success');
      resolve(httpServer);
    };
    const handleError = (error: Error) => {
      httpServer.off('listening', handleListen);
      reject(error);
    };

    httpServer.once('error', handleError);
    httpServer.once('listening', handleListen);
  });

  server.on('error', (error) => {
    logger.fatal({ err: error, host: HTTP_HOST, port }, 'HTTP server error');
  });
};

const warmDatabaseAndStartJobs = async () => {
  logger.info({ timeoutMs: DB_WARMUP_TIMEOUT_MS }, 'DB warmup start');

  try {
    await pgInit(DB_WARMUP_TIMEOUT_MS);
    logger.info({ timeoutMs: DB_WARMUP_TIMEOUT_MS }, 'DB warmup success');
  } catch (error) {
    logger.error(
      {
        err: error,
        error: error instanceof Error ? error.message : 'Unknown DB warmup error',
        timeoutMs: DB_WARMUP_TIMEOUT_MS,
      },
      'DB warmup failed; background jobs not started',
    );
    return;
  }

  stopBackgroundJobs = startBackgroundJobs();
  logger.info('Job scheduler start');
};

const start = async () => {
  await warmDatabaseAndStartJobs();
  await listen();
};

/* -------------------------Graceful Shutdown------------------------- */
const stop = async (reason: string, exitCode = 0) => {
  if (isShuttingDown) {
    logger.warn({ reason }, 'Shutdown already in progress');
    return;
  }

  isShuttingDown = true;

  try {
    stopBackgroundJobs?.();
    stopBackgroundJobs = null;

    await Promise.race([
      (async () => {
        if (server) {
          await new Promise<void>((resolve, reject) => {
            server?.close((error) => (error ? reject(error) : resolve()));
          });
        }

        await pgStop();
      })(),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Taking too long to close connection, forcefully shutting down...'));
        }, 10000);
      }),
    ]);
    logger.info({ reason }, 'Server down successfully');
    process.exit(exitCode);
  } catch (error) {
    logger.fatal({ err: error, reason }, 'Fatal server stop error');
    process.exit(1);
  }
};

/* ---------------------------- graceful shutdown --------------------------- */
process.on('SIGINT', () => {
  void stop('SIGINT');
});
process.on('SIGTERM', () => {
  void stop('SIGTERM');
});
process.on('uncaughtException', (error) => {
  logger.fatal({ err: error }, 'Uncaught exception');
  void stop('uncaughtException', 1);
});
process.on('unhandledRejection', (reason) => {
  logger.fatal({ err: toError(reason), reason }, 'Unhandled promise rejection');
  void stop('unhandledRejection', 1);
});

/* -------------------------------------------------------------------------- */
start().catch((error) => {
  logger.fatal({ err: error }, 'Fatal server start error');
  process.exit(1);
});
