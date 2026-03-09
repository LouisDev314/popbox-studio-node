import type { ErrorRequestHandler } from 'express';
import Exception from '../utils/Exception';
import logger from '../utils/logger';
import HttpStatusCode from '../constant/http-status-code';

const STATUS_TO_METHOD: Record<number, keyof Express.Response> = {
  [HttpStatusCode.BAD_REQUEST]: 'send_badRequest',
  [HttpStatusCode.UNAUTHORIZED]: 'send_unauthorized',
  [HttpStatusCode.FORBIDDEN]: 'send_forbidden',
  [HttpStatusCode.NOT_FOUND]: 'send_notFound',
  [HttpStatusCode.CONFLICT]: 'send_conflict',
  [HttpStatusCode.UNPROCESSABLE_ENTITY]: 'send_unprocessableEntity',
  [HttpStatusCode.TOO_MANY_REQUESTS]: 'send_tooManyRequests',
  [HttpStatusCode.INTERNAL_SERVER_ERROR]: 'send_internalServerError',
};

const isHttpErrorStatus = (code: unknown): code is number =>
  typeof code === 'number' && Number.isInteger(code) && code >= 400 && code <= 599;

const isServerError = (code: number) => code >= 500;

/* eslint-disable @typescript-eslint/no-explicit-any */
const exceptionHandler: ErrorRequestHandler = (err, req, res, next) => {
  // keep Express signature (don’t remove next)
  void next;

  const requestId = (req as any).id;

  if (err instanceof Exception) {
    const code = isHttpErrorStatus(err.code) ? err.code : HttpStatusCode.INTERNAL_SERVER_ERROR;
    const method = STATUS_TO_METHOD[code] ?? 'send_internalServerError';

    // If it’s a server error, don’t leak internals to client
    if (isServerError(code)) {
      logger.error(
        {
          requestId,
          code,
          msg: err.msg,
          data: err.data,
          cause: err.cause,
          stack: err.stack,
        },
        'Operational exception (server)',
      );
      return res.send_internalServerError('Internal server error');
    }

    // 4xx: safe to return the message & data (assuming you keep them clean)
    return (res[method] as any)(err.msg, err.data);
  }

  // Unknown / programmer error / library error
  logger.error({ requestId, err, stack: (err as any)?.stack }, 'Unhandled error');
  return res.send_internalServerError('Internal server error');
};

export default exceptionHandler;
