import 'express';

declare module 'express-serve-static-core' {
  interface Response {
    send_badRequest: (message?: string, data?: unknown) => this;
    send_unauthorized: (message?: string, data?: unknown) => this;
    send_forbidden: (message?: string, data?: unknown) => this;
    send_notFound: (message?: string, data?: unknown) => this;
    send_conflict: (message?: string, data?: unknown) => this;
    send_unprocessableEntity: (message?: string, data?: unknown) => this;
    send_tooManyRequests: (message?: string, data?: unknown) => this;
    send_internalServerError: (message?: string, data?: unknown) => this;
  }
}
