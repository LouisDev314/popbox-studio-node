import express from 'express';
import { HttpStatusCode } from 'axios';

/**
 * Call responseInterceptor() ONCE during app bootstrap,
 * BEFORE registering routes.
 */

declare global {
  namespace Express {
    interface Response {
      send_ok(message: string, content?: unknown): Response;
      send_created(message: string, content?: unknown): Response;
      send_accepted(message: string, content?: unknown): Response;
      send_noContent(message: string, content?: unknown): Response;

      send_badRequest(message: string, content?: unknown): Response;
      send_unauthorized(message: string, content?: unknown): Response;
      send_forbidden(message: string, content?: unknown): Response;
      send_notFound(message: string, content?: unknown): Response;
      send_conflict(message: string, content?: unknown): Response;
      send_unprocessableEntity(message: string, content?: unknown): Response;
      send_tooManyRequests(message: string, content?: unknown): Response;

      send_internalServerError(message: string, content?: unknown): Response;
      send_badGateway(message: string, content?: unknown): Response;
      send_serviceUnavailable(message: string, content?: unknown): Response;
      send_gatewayTimeout(message: string, content?: unknown): Response;
    }
  }
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const isObjectEmpty = (obj: object): boolean => Object.keys(obj).length === 0;

/**
 * Explicit mapping: HTTP code → method suffix
 * (NO reflection, NO enum hacks, NO axios helpers)
 */
const STATUS_METHOD_MAP: Record<number, string> = {
  [HttpStatusCode.Ok]: 'ok',
  [HttpStatusCode.Created]: 'created',
  [HttpStatusCode.Accepted]: 'accepted',
  [HttpStatusCode.NoContent]: 'noContent',

  [HttpStatusCode.BadRequest]: 'badRequest',
  [HttpStatusCode.Unauthorized]: 'unauthorized',
  [HttpStatusCode.Forbidden]: 'forbidden',
  [HttpStatusCode.NotFound]: 'notFound',
  [HttpStatusCode.Conflict]: 'conflict',
  [HttpStatusCode.UnprocessableEntity]: 'unprocessableEntity',
  [HttpStatusCode.TooManyRequests]: 'tooManyRequests',

  [HttpStatusCode.InternalServerError]: 'internalServerError',
  [HttpStatusCode.BadGateway]: 'badGateway',
  [HttpStatusCode.ServiceUnavailable]: 'serviceUnavailable',
  [HttpStatusCode.GatewayTimeout]: 'gatewayTimeout',
};

export const responseInterceptor = (): void => {
  for (const [codeStr, suffix] of Object.entries(STATUS_METHOD_MAP)) {
    const code = Number(codeStr);
    const success = String(code).startsWith('1') || String(code).startsWith('2');
    const methodName = `send_${suffix}`;

    // eslint-disable-next-line
    (express.response as any)[methodName] = function (
      message: string,
      content?: unknown,
    ) {
      const hasContent =
        content !== undefined &&
        content !== null &&
        !(isPlainObject(content) && isObjectEmpty(content));

      return this.status(code).json({
        code,
        success,
        message,
        data: hasContent && success ? content : undefined,
        errors: hasContent && !success ? content : undefined,
      });
    };
  }
};

export default responseInterceptor;
