import { Router } from 'express';
import rateLimiter from '../../../middleware/rate-limiter';

const authRouter: Router = Router();

const authLimiter = rateLimiter(15,
  20,
  'Too many authentication attempts. Please try again later.',
);

export default authRouter;
