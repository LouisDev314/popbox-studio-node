import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import logger from '../config/logger';

declare global {
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

const requestId = (options: Options = {}) => {
    const headerName = options.headerName ?? 'x-request-id';

    return function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
        const incoming =
            (req.headers[headerName] as string | undefined) ||
            (req.headers[headerName.toLowerCase()] as string | undefined);

        const id = (incoming && String(incoming).trim()) || randomUUID();

        req.id = id;
        res.setHeader(headerName, id);

        // attach request-scoped logger (pino-style child loggers supported)
        req.log = (logger as any).child ? (logger as any).child({ requestId: id }) : logger;

        next();
    };
}

export default requestId;