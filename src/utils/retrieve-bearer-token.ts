import Exception from './Exception';
import HttpStatusCode from '../constants/http-status-code';

const retrieveBearerToken = (header?: string): string => {
  const UNAUTHORIZED_MESSAGE = 'Missing or invalid authorization header';

  if (!header) {
    throw new Exception(HttpStatusCode.UNAUTHORIZED, UNAUTHORIZED_MESSAGE);
  }

  const match = header.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1]?.trim();

  if (!token) {
    throw new Exception(HttpStatusCode.UNAUTHORIZED, UNAUTHORIZED_MESSAGE);
  }

  return token;
};

export default retrieveBearerToken;
