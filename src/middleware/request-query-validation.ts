import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodType } from 'zod';
import Exception from '../utils/Exception';
import HttpStatusCode from '../constant/http-status-code';

const validateQuery = <T extends ZodType>(schema: T, errMsg: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query) as Request['query'];
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        next(
          new Exception(HttpStatusCode.BAD_REQUEST, `Invalid request query - ${errMsg}`, {
            data: err.flatten(),
          }),
        );
        return;
      }

      next(err);
    }
  };
};

export default validateQuery;
