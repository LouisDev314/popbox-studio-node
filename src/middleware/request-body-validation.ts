import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodType, z } from 'zod';
import Exception from '../utils/Exception';
import HttpStatusCode from '../constants/http-status-code';

const validateBody = <T extends ZodType>(schema: T, errMsg: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.validated ??= {};
      req.validated.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(
          new Exception(HttpStatusCode.BAD_REQUEST, `Invalid request body - ${errMsg}`, {
            data: z.treeifyError(err),
          }),
        );
      }

      next(err);
    }
  };
};

export default validateBody;
