import * as Sentry from '@sentry/node';
import type { Breadcrumb, Event } from '@sentry/node';

const REDACTION_VALUE = '[REDACTED]';
const SENSITIVE_QUERY_PARAMS = new Set(['token', 'session_id', 'checkout_session_id']);
const SENSITIVE_HEADERS = new Set(['authorization', 'cookie', 'set-cookie', 'x-order-token']);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const sanitizeUrl = (rawUrl: string) => {
  try {
    const url = new URL(rawUrl, 'http://localhost');

    for (const paramName of SENSITIVE_QUERY_PARAMS) {
      if (url.searchParams.has(paramName)) {
        url.searchParams.set(paramName, REDACTION_VALUE);
      }
    }

    return rawUrl.startsWith('http://') || rawUrl.startsWith('https://')
      ? url.toString()
      : `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return rawUrl
      .replace(/([?&]token=)[^&]+/gi, `$1${REDACTION_VALUE}`)
      .replace(/([?&]session_id=)[^&]+/gi, `$1${REDACTION_VALUE}`)
      .replace(/([?&]checkout_session_id=)[^&]+/gi, `$1${REDACTION_VALUE}`);
  }
};

const sanitizeQueryString = (value: unknown) => {
  if (typeof value === 'string') {
    const normalizedValue = value.startsWith('?') ? value : `?${value}`;
    const sanitizedValue = sanitizeUrl(normalizedValue);

    if (sanitizedValue.startsWith('/?')) {
      return sanitizedValue.slice(2);
    }

    return sanitizedValue.startsWith('?') ? sanitizedValue.slice(1) : sanitizedValue;
  }

  if (!isRecord(value)) {
    return value;
  }

  let changed = false;
  const sanitizedQuery: Record<string, unknown> = {};

  for (const [key, entryValue] of Object.entries(value)) {
    if (SENSITIVE_QUERY_PARAMS.has(key.toLowerCase())) {
      sanitizedQuery[key] = REDACTION_VALUE;
      changed = true;
      continue;
    }

    sanitizedQuery[key] = entryValue;
  }

  return changed ? sanitizedQuery : value;
};

const sanitizeHeaders = (value: unknown) => {
  if (!isRecord(value)) {
    return value;
  }

  let changed = false;
  const sanitizedHeaders: Record<string, unknown> = {};

  for (const [key, entryValue] of Object.entries(value)) {
    if (SENSITIVE_HEADERS.has(key.toLowerCase())) {
      sanitizedHeaders[key] = REDACTION_VALUE;
      changed = true;
      continue;
    }

    sanitizedHeaders[key] = entryValue;
  }

  return changed ? sanitizedHeaders : value;
};

const sanitizeRequest = (request: Event['request']) => {
  if (!request) {
    return request;
  }

  const sanitizedUrl = typeof request.url === 'string' ? sanitizeUrl(request.url) : request.url;
  const sanitizedQueryString = sanitizeQueryString(request.query_string);
  const sanitizedHeaders = sanitizeHeaders(request.headers);

  if (
    sanitizedUrl === request.url &&
    sanitizedQueryString === request.query_string &&
    sanitizedHeaders === request.headers
  ) {
    return request;
  }

  return {
    ...request,
    ...(sanitizedUrl !== request.url ? { url: sanitizedUrl } : {}),
    ...(sanitizedQueryString !== request.query_string ? { query_string: sanitizedQueryString } : {}),
    ...(sanitizedHeaders !== request.headers ? { headers: sanitizedHeaders } : {}),
  };
};

const sanitizeRequestEvent = <T extends { request?: Event['request'] }>(event: T) => {
  const sanitizedRequest = sanitizeRequest(event.request);

  if (sanitizedRequest === event.request) {
    return event;
  }

  return {
    ...event,
    request: sanitizedRequest,
  };
};

const sanitizeBreadcrumb = (breadcrumb: Breadcrumb) => {
  if (!isRecord(breadcrumb.data)) {
    return breadcrumb;
  }

  const sanitizedUrl = typeof breadcrumb.data.url === 'string' ? sanitizeUrl(breadcrumb.data.url) : breadcrumb.data.url;
  const sanitizedFrom =
    typeof breadcrumb.data.from === 'string' ? sanitizeUrl(breadcrumb.data.from) : breadcrumb.data.from;
  const sanitizedTo = typeof breadcrumb.data.to === 'string' ? sanitizeUrl(breadcrumb.data.to) : breadcrumb.data.to;
  const sanitizedHeaders = sanitizeHeaders(breadcrumb.data.headers);

  if (
    sanitizedUrl === breadcrumb.data.url &&
    sanitizedFrom === breadcrumb.data.from &&
    sanitizedTo === breadcrumb.data.to &&
    sanitizedHeaders === breadcrumb.data.headers
  ) {
    return breadcrumb;
  }

  return {
    ...breadcrumb,
    data: {
      ...breadcrumb.data,
      ...(sanitizedUrl !== breadcrumb.data.url ? { url: sanitizedUrl } : {}),
      ...(sanitizedFrom !== breadcrumb.data.from ? { from: sanitizedFrom } : {}),
      ...(sanitizedTo !== breadcrumb.data.to ? { to: sanitizedTo } : {}),
      ...(sanitizedHeaders !== breadcrumb.data.headers ? { headers: sanitizedHeaders } : {}),
    },
  };
};

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: process.env.NODE_ENV === 'production',
    environment: process.env.NODE_ENV,
    release: process.env.SENTRY_RELEASE,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    sendDefaultPii: false,
    integrations: [Sentry.expressIntegration()],
    beforeSend(event) {
      return sanitizeRequestEvent(event);
    },
    beforeSendTransaction(event) {
      return sanitizeRequestEvent(event);
    },
    beforeBreadcrumb(breadcrumb) {
      return sanitizeBreadcrumb(breadcrumb);
    },
  });
}

export { Sentry };
