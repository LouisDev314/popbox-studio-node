type ExceptionOptions = {
  data?: unknown;
  cause?: unknown;
  isOperational?: boolean; // true for expected errors (validation, auth, etc.)
};

export default class Exception extends Error {
  public code: number;
  public msg: string;
  public data: unknown | null;
  public cause?: unknown;
  public isOperational: boolean;

  constructor(code: number, msg: string = '', options: ExceptionOptions = {}) {
    super(msg);

    this.name = 'Exception';
    this.code = code;
    this.msg = msg;
    this.data = options.data ?? null;
    this.cause = options.cause;
    this.isOperational = options.isOperational ?? true;

    // ensures stack trace correctness in V8
    Error.captureStackTrace?.(this, Exception);
  }

  toJSON() {
    // safe-ish for logs; don’t blindly return stack/cause to clients
    return {
      name: this.name,
      code: this.code,
      msg: this.message,
      data: this.data,
      isOperational: this.isOperational,
    };
  }

  // Convenience constructors (optional, but nice DX)
  static badRequest(msg = 'Bad request', data?: unknown) {
    return new Exception(400, msg, { data, isOperational: true });
  }
  static unauthorized(msg = 'Unauthorized', data?: unknown) {
    return new Exception(401, msg, { data, isOperational: true });
  }
  static forbidden(msg = 'Forbidden', data?: unknown) {
    return new Exception(403, msg, { data, isOperational: true });
  }
  static notFound(msg = 'Not found', data?: unknown) {
    return new Exception(404, msg, { data, isOperational: true });
  }
  static conflict(msg = 'Conflict', data?: unknown) {
    return new Exception(409, msg, { data, isOperational: true });
  }
  static unprocessable(msg = 'Unprocessable entity', data?: unknown) {
    return new Exception(422, msg, { data, isOperational: true });
  }
  static tooManyRequests(msg = 'Too many requests', data?: unknown) {
    return new Exception(429, msg, { data, isOperational: true });
  }
  static internal(msg = 'Internal server error', data?: unknown, cause?: unknown) {
    return new Exception(500, msg, { data, cause, isOperational: false });
  }
}
