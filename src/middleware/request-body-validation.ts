import type { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';
import Exception from '../utils/Exception';
import HttpStatusCode from '../constants/http-status-code';

const validateBody = (schema: ZodType, errMsg: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Exception(HttpStatusCode.BAD_REQUEST, `Invalid request body - ${errMsg}:`, err);
      }
      next(err);
    }
  };
};

export default validateBody;
