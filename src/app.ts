import './types/express';
import express, { type Express } from 'express';
import cors from 'cors';
import responseInterceptor from './middleware/response-interceptor';
import getEnvConfig from './config/env';
import helmet from 'helmet';
import compression from 'compression';
import rootRouter from './routes';
import exceptionHandler from './middleware/exception-handler';
import notFoundHandler from './middleware/not-found-handler';
import healthRouter from './routes/v1/health-router';
import webhooksRouter from './routes/v1/webhooks-router';
import { globalLimiter } from './middleware/rate-limit';
import httpLogger from './utils/http-logger';

export const createApp = (): Express => {
  const { corsOrigin } = getEnvConfig();
  const app = express();

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

  return app;
};

export default createApp;
