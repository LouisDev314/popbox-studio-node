import type { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';
import Exception from '../utils/Exception';
import { HttpStatusCode } from 'axios';

const validateBody = (schema: ZodType, errMsg: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Exception(HttpStatusCode.BadRequest, `Invalid request body - ${errMsg}:`, err);
      }
      next(err);
    }
  };
};

export default validateBody;
