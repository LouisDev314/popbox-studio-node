import type { IncomingHttpHeaders } from 'http';
import pinoHttp from 'pino-http';
import pino from 'pino';
import { randomUUID } from 'crypto';
import logger from './logger';

const SENSITIVE_QUERY_PARAMS = new Set(['token', 'session_id']);
const SENSITIVE_HEADER_NAMES = new Set(['x-order-token']);
const URL_REDACTION_VALUE = '[REDACTED]';

const redactSensitiveUrl = (rawUrl: string | undefined) => {
  if (!rawUrl) {
    return rawUrl;
  }

  try {
    const url = new URL(rawUrl, 'http://localhost');

    for (const paramName of SENSITIVE_QUERY_PARAMS) {
      if (url.searchParams.has(paramName)) {
        url.searchParams.set(paramName, URL_REDACTION_VALUE);
      }
    }

    const sanitizedPath = `${url.pathname}${url.search}${url.hash}`;
    return rawUrl.startsWith('http://') || rawUrl.startsWith('https://') ? url.toString() : sanitizedPath;
  } catch {
    return rawUrl
      .replace(/([?&]token=)[^&]+/gi, `$1${URL_REDACTION_VALUE}`)
      .replace(/([?&]session_id=)[^&]+/gi, `$1${URL_REDACTION_VALUE}`);
  }
};

const redactSensitiveHeaders = (headers: IncomingHttpHeaders | undefined) => {
  if (!headers) {
    return headers;
  }

  const sanitizedHeaders: IncomingHttpHeaders = { ...headers };

  for (const headerName of Object.keys(sanitizedHeaders)) {
    if (SENSITIVE_HEADER_NAMES.has(headerName.toLowerCase())) {
      sanitizedHeaders[headerName] = URL_REDACTION_VALUE;
      continue;
    }

    if (headerName.toLowerCase() === 'referer' || headerName.toLowerCase() === 'referrer') {
      const headerValue = sanitizedHeaders[headerName];
      if (typeof headerValue === 'string') {
        sanitizedHeaders[headerName] = redactSensitiveUrl(headerValue);
      }
    }
  }

  return sanitizedHeaders;
};

const httpLogger = pinoHttp({
  logger,

  genReqId(req, res) {
    const incoming = req.headers['x-request-id'];
    const id = typeof incoming === 'string' && incoming.trim() ? incoming.trim() : randomUUID();

    res.setHeader('x-request-id', id);
    return id;
  },

  serializers: {
    req(req) {
      const serializedRequest = pino.stdSerializers.req(req);

      return {
        ...serializedRequest,
        url: redactSensitiveUrl(serializedRequest.url),
        headers: redactSensitiveHeaders(serializedRequest.headers),
      };
    },
  },
});

export default httpLogger;
