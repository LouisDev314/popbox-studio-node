import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodType } from 'zod';
import Exception from '../utils/Exception';
import HttpStatusCode from '../constant/http-status-code';

const validateBody = <T extends ZodType>(schema: T, errMsg: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.validated.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        next(
          new Exception(HttpStatusCode.BAD_REQUEST, `Invalid request body - ${errMsg}`, {
            data: err.flatten(),
          }),
        );
        return;
      }

      next(err);
    }
  };
};

export default validateBody;
