import express from 'express';

/**
 * Call responseInterceptor() ONCE during app bootstrap,
 * BEFORE registering routes.
 */

declare global {
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace Express {
    interface Response {
      send_ok(message: string, content?: unknown): Response;
      send_created(message: string, content?: unknown): Response;
      send_accepted(message: string, content?: unknown): Response;
      send_noContent(message?: string): Response;

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

const hasMeaningfulContent = (content: unknown): boolean => {
  if (content === undefined || content === null) return false;
  return !(isPlainObject(content) && isObjectEmpty(content));
  // keep [] / '' / 0 as meaningful by default
};

const STATUS_METHOD_MAP: Record<number, string> = {
  200: 'ok',
  201: 'created',
  202: 'accepted',
  204: 'noContent',

  400: 'badRequest',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'notFound',
  409: 'conflict',
  422: 'unprocessableEntity',
  429: 'tooManyRequests',

  500: 'internalServerError',
  502: 'badGateway',
  503: 'serviceUnavailable',
  504: 'gatewayTimeout',
};

export const responseInterceptor = (): void => {
  // idempotent guard (tests/hot-reload)
  /* eslint-disable @typescript-eslint/no-explicit-any */
  if ((express.response as any).__pb_response_interceptor_installed) return;
  (express.response as any).__pb_response_interceptor_installed = true;

  for (const [codeStr, suffix] of Object.entries(STATUS_METHOD_MAP)) {
    const code = Number(codeStr);
    const success = code >= 200 && code < 400;
    const methodName = `send_${suffix}`;

    if ((express.response as any)[methodName]) continue;

    (express.response as any)[methodName] = function (this: express.Response, message: string = '', content?: unknown) {
      // 204 must not include a body
      if (code === 204) {
        return this.status(204).end();
      }

      const hasContent = hasMeaningfulContent(content);

      // requestId is attached by requestId middleware; safe optional access
      const requestId = (this.req as any)?.id;

      const payload: Record<string, unknown> = {
        code,
        success,
        message,
        ...(requestId ? { requestId } : {}),
      };

      if (hasContent) {
        if (success) payload.data = content;
        else payload.errors = content;
      }

      return this.status(code).json(payload);
    };
  }
};

export default responseInterceptor;
