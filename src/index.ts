import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'http';
import responseInterceptor from './middleware/response-interceptor';
import getEnvConfig from './config/env';
import helmet from 'helmet';
import compression from 'compression';
import rateLimiter from './middleware/rate-limiter';
import rootRouter from './routes';
import exceptionHandler from './middleware/exception-handler';
import logger from './config/logger';
import { redisInit, redisStop } from './services/redis';
import { postgresInit, postgresStop } from './db/prisma';

dotenv.config();

/* -------------------------Setup variables------------------------- */
const { port } = getEnvConfig();
const app = express();
let server: Server;

/* -------------------------Setup Express middleware------------------------- */
app.use(responseInterceptor);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', 1);
app.use(cors()); // TODO: set up cors options: app.use(cors(corsOptions));
app.use(helmet()); // Enable security headers
app.use(
  compression({
    level: 6, // balance speed vs compression
    threshold: 1024, // only compress bodies >= 1KB
  }),
);

// Rate limiting
const limiter = rateLimiter(1, 100, 'Too many requests, please try again later.');
app.use(limiter);
app.use('/api', rootRouter);
app.use(exceptionHandler);

/* -------------------------Init------------------------- */
const applicationBootstrap = async () => {
  await Promise.all([postgresInit(), redisInit()]);
};

const start = async () => {
  try {
    await applicationBootstrap();
    server = app.listen(port, '0.0.0.0', () => {
      logger.info(`Server started at port ${port}`);
    });
  } catch (err) {
    logger.error('Fatal server start error', err);
    process.exit(1);
  }
};

/* -------------------------Graceful Shutdown------------------------- */
const stop = async () => {
  try {
    await Promise.race([
      new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      }).then(() => {
        return Promise.all([postgresStop(), redisStop()]);
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
    logger.error('Fatal server stop error',err);
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
