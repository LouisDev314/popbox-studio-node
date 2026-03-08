import pinoHttp from 'pino-http';
import { randomUUID } from 'crypto';
import logger from './logger';

const httpLogger = pinoHttp({
  logger,

  genReqId(req, res) {
    const incoming = req.headers['x-request-id'];
    const id = typeof incoming === 'string' && incoming.trim() ? incoming.trim() : randomUUID();

    res.setHeader('x-request-id', id);
    return id;
  },
});

export default httpLogger;
