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
import requestId from './middleware/requestId';
import notFoundHandler from './middleware/not-found-handler';
import { pinoHttp } from 'pino-http';
import healthRouter from './routes/v1/health-router';
import { globalLimiter } from './middleware/rate-limit';
import { startBackgroundJobs } from './jobs';
import { verifyDatabaseConnection } from './db';

/* -------------------------Setup variables------------------------- */
const { port, corsOrigin } = getEnvConfig();
const app = express();
let server: Server;
let stopBackgroundJobs: (() => void) | null = null;

/* -------------------------Setup Express middleware------------------------- */
responseInterceptor();
app.disable('x-powered-by');
app.use(requestId());
// Trust proxy if deploying behind load balancers (Render/Fly/Nginx)
app.set('trust proxy', 1);
app.use(pinoHttp());
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
app.use('/v1/webhooks/stripe', express.raw({ type: 'application/json', limit: '1mb' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use(rootRouter);
app.use('/health', healthRouter);
app.use(notFoundHandler);
app.use(exceptionHandler);

/* -------------------------Init------------------------- */
const applicationBootstrap = async () => {
  await verifyDatabaseConnection();
  stopBackgroundJobs = startBackgroundJobs();
};

const start = async () => {
  try {
    await applicationBootstrap();
    server = app.listen(port, '0.0.0.0', () => {
      logger.info(`Server started at port ${port}`);
    });
  } catch (err) {
    logger.fatal(err, 'Fatal server start error');
    process.exit(1);
  }
};

/* -------------------------Graceful Shutdown------------------------- */
const stop = async () => {
  try {
    if (!server?.listening) {
      stopBackgroundJobs?.();
      logger.info('Server down successfully');
      process.exit(0);
    }

    await Promise.race([
      new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      }).then(() => {
        // Potential task/service to stop
        stopBackgroundJobs?.();
        return Promise.all([]);
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Taking too long to close connection, forcefully shutting down...'));
        }, 10000);
      }),
    ]);
    logger.info('Server down successfully');
    process.exit(0);
  } catch (err) {
    logger.fatal(err, 'Fatal server stop error');
    process.exit(1);
  }
};

/* ---------------------------- graceful shutdown --------------------------- */
process.on('SIGINT', stop);
process.on('SIGTERM', stop);

/* -------------------------------------------------------------------------- */
start().catch(() => {
  process.abort();
});
