import { Router } from 'express';
import rateLimiter from '../../../middleware/rate-limiter';

const paymentRouter: Router = Router();

const paymentLimiter = rateLimiter(
  1,
  10,
  'Too many payment requests. Please wait.',
);

export default paymentRouter;
