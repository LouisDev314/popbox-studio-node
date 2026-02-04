import winston from 'winston';
import getEnvConfig from './env';

const { nodeEnv, logLevel } = getEnvConfig();
const isProd = nodeEnv === 'production';

// Custom levels (keeps your http level)
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
} as const;

// Base format: timestamp + stack traces + metadata support
const baseFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }), // include error.stack
  winston.format.splat(), // support printf-style %s
  winston.format.metadata({
    // everything except these goes into `metadata`
    fillExcept: ['message', 'level', 'timestamp', 'label'],
  }),
);

// Dev: human-readable lines + colors
const devFormat = winston.format.combine(
  baseFormat,
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    const { timestamp, level, message } = info;
    const stack = info.stack ? `\n${info.stack}` : '';

    const metadata =
      info.metadata && Object.keys(info.metadata).length > 0
        ? ` ${JSON.stringify(info.metadata)}`
        : '';

    return `[${String(level).toUpperCase()}] ${timestamp} ${message}${metadata}${stack}`;
  }),
);

// Prod (Render): JSON for best search/filters
const prodFormat = winston.format.combine(baseFormat, winston.format.json());

// Console transport only (Render captures stdout/stderr)
const consoleTransport = new winston.transports.Console({
  level: logLevel, // can still override per env
  format: isProd ? prodFormat : devFormat,
  // Winston automatically writes to stdout; Render collects it.
});

// Create logger
const logger = winston.createLogger({
  levels,
  level: logLevel, // default logger level (e.g. "info", "http", "debug")
  transports: [consoleTransport],
  // Do NOT exit on handled exceptions; we'll decide manually for safety.
  exitOnError: false,
});

// --- Process-level safety: log + (in prod) exit so Render restarts cleanly ---

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', err);

  if (isProd) {
    // Give logs a moment to flush
    setTimeout(() => process.exit(1), 250).unref();
  }
});

process.on('unhandledRejection', (reason) => {
  // `reason` can be anything: Error | string | object
  if (reason instanceof Error) {
    logger.error('Unhandled Rejection', reason);
  } else {
    logger.error('Unhandled Rejection', { reason });
  }

  if (isProd) {
    setTimeout(() => process.exit(1), 250).unref();
  }
});

export default logger;
