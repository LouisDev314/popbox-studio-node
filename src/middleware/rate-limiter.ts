import rateLimit from 'express-rate-limit';
import Exception from '../utils/Exception';
import { HttpStatusCode } from 'axios';

const rateLimiter = (minutes: number, limit: number, errMsg: string) =>
  rateLimit({
    windowMs: minutes * 60 * 1000,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (req, res, next) => {
      next(new Exception(HttpStatusCode.TooManyRequests, errMsg));
    },
  });

export default rateLimiter;
