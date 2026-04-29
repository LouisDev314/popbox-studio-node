import Exception from './Exception';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const parseHttpStatus = (status: unknown) => {
  if (typeof status === 'number' && Number.isInteger(status)) {
    return status;
  }

  if (typeof status === 'string' && status.trim()) {
    const parsedStatus = Number.parseInt(status, 10);
    return Number.isInteger(parsedStatus) ? parsedStatus : null;
  }

  return null;
};

const getErrorStatusCode = (error: unknown) => {
  if (error instanceof Exception) {
    return error.code;
  }

  if (!isRecord(error)) {
    return null;
  }

  const output = isRecord(error.output) ? error.output : null;

  return (
    parseHttpStatus(error.status) ??
    parseHttpStatus(error.statusCode) ??
    parseHttpStatus(error.status_code) ??
    parseHttpStatus(output?.statusCode)
  );
};

export const shouldReportErrorToSentry = (error: unknown) => {
  const statusCode = getErrorStatusCode(error);

  return statusCode === null || statusCode >= 500;
};
