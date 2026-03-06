import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import logger from '../utils/logger';

declare global {
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace Express {
    interface Request {
      id: string;
      log: typeof logger;
    }
  }
}

type Options = {
  headerName?: string; // incoming/outgoing header
};

// TODO: not sure if this is the right way to implement
const requestId = (options: Options = {}) => {
  const headerName = options.headerName ?? 'x-request-id';

  return (req: Request, res: Response, next: NextFunction) => {
    const incoming =
      (req.headers[headerName] as string | undefined) || (req.headers[headerName.toLowerCase()] as string | undefined);

    const id = (incoming && String(incoming).trim()) || randomUUID();

    req.id = id;
    res.setHeader(headerName, id);

    // attach request-scoped logger (pino-style child loggers supported)
    /* eslint-disable @typescript-eslint/no-explicit-any */
    req.log = (logger as any).child ? (logger as any).child({ requestId: id }) : logger;

    next();
  };
};

export default requestId;
