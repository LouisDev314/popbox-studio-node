import './types/express';
import express from 'express';
import cors from 'cors';
import { Server } from 'http';
import responseInterceptor from './middleware/response-interceptor';
import getEnvConfig from './config/env';
import helmet from 'helmet';
import compression from 'compression';
import rootRouter from './routes';
import exceptionHandler from './middleware/exception-handler';
import logger from './utils/logger';
import notFoundHandler from './middleware/not-found-handler';
import healthRouter from './routes/v1/health-router';
import webhooksRouter from './routes/v1/webhooks-router';
import { globalLimiter } from './middleware/rate-limit';
import httpLogger from './utils/http-logger';
import { pgInit, pgStop } from './db';
import { startBackgroundJobs } from './jobs';

/* -------------------------Setup variables------------------------- */
const { port, corsOrigin } = getEnvConfig();
const HTTP_HOST = '0.0.0.0';
const DB_WARMUP_TIMEOUT_MS = 3000;
const app = express();
let server: Server | null = null;
let stopBackgroundJobs: (() => void) | null = null;
let isShuttingDown = false;

const toError = (error: unknown) => {
  if (error instanceof Error) {
    return error;
  }

  return new Error(typeof error === 'string' ? error : 'Unknown error');
};

/* -------------------------Setup Express middleware------------------------- */
responseInterceptor();
app.disable('x-powered-by');
// Trust proxy if deploying behind load balancers (Render/Fly/Nginx)
app.set('trust proxy', 1);
app.use(httpLogger);
// Stripe webhook signature verification must see the untouched raw body.
app.use('/api/v1/webhooks', webhooksRouter);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  }),
);
app.use(helmet()); // Enable security headers
app.use(
  compression({
    level: 6, // balance speed vs compression
    threshold: 1024, // only compress bodies >= 1KB
  }),
);

// Rate limiting
app.use(globalLimiter);
app.use('/api', rootRouter);
app.use('/', healthRouter);
app.use(notFoundHandler);
app.use(exceptionHandler);

/* -------------------------Init------------------------- */
const listen = async () => {
  logger.info({ host: HTTP_HOST, port }, 'Server boot begin');

  server = await new Promise<Server>((resolve, reject) => {
    const httpServer = app.listen(port, HTTP_HOST);
    const handleListen = () => {
      httpServer.off('error', handleError);
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
  await listen();
  await warmDatabaseAndStartJobs();
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
  logger.error({ err: toError(reason), reason }, 'Unhandled promise rejection');
});

/* -------------------------------------------------------------------------- */
start().catch((error) => {
  logger.fatal({ err: error }, 'Fatal server start error');
  process.exit(1);
});
