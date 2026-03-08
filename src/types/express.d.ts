import type { JwtPayload } from 'jose';
import type { Logger } from 'pino';
import 'express';

type ResponseContent = unknown;
type ValidatedRequestState = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
};

declare global {
  namespace Express {
    interface Request {
      id: string;
      log: Logger;
      validated: ValidatedRequestState;
      authUser?: {
        id: string;
        email: string;
        role: string;
        claims: JwtPayload;
      };
      orderAccess?: {
        orderId: string;
        publicId: string;
        token: string;
      };
    }
  }
}

declare module 'express-serve-static-core' {
  interface Response {
    send_ok: (message?: string, data?: ResponseContent) => this;
    send_created: (message?: string, data?: ResponseContent) => this;
    send_accepted: (message?: string, data?: ResponseContent) => this;
    send_noContent: (message?: string) => this;
    send_badRequest: (message?: string, data?: ResponseContent) => this;
    send_unauthorized: (message?: string, data?: ResponseContent) => this;
    send_forbidden: (message?: string, data?: ResponseContent) => this;
    send_notFound: (message?: string, data?: ResponseContent) => this;
    send_conflict: (message?: string, data?: ResponseContent) => this;
    send_unprocessableEntity: (message?: string, data?: ResponseContent) => this;
    send_tooManyRequests: (message?: string, data?: ResponseContent) => this;
    send_internalServerError: (message?: string, data?: ResponseContent) => this;
    send_badGateway: (message?: string, data?: ResponseContent) => this;
    send_serviceUnavailable: (message?: string, data?: ResponseContent) => this;
    send_gatewayTimeout: (message?: string, data?: ResponseContent) => this;
  }
}
