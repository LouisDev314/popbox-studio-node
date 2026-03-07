import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import type { Logger } from 'pino';
import logger from '../utils/logger';

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
    req.log = (typeof logger.child === 'function' ? logger.child({ requestId: id }) : logger) as Logger;

    next();
  };
};

export default requestId;
