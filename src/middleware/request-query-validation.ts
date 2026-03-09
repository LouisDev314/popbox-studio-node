import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodType, z } from 'zod';
import Exception from '../utils/Exception';
import HttpStatusCode from '../constants/http-status-code';

const validateQuery = <T extends ZodType>(schema: T, errMsg: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.validated.query = schema.parse(req.query);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(
          new Exception(HttpStatusCode.BAD_REQUEST, `Invalid request query - ${errMsg}`, {
            data: z.treeifyError(err),
          }),
        );
      }

      next(err);
    }
  };
};

export default validateQuery;
