import Exception from './Exception';
import HttpStatusCode from '../constants/http-status-code';

const retrieveBearerToken = (header: string) => {
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new Exception(HttpStatusCode.UNAUTHORIZED, 'Missing or invalid authorization header');

  const token = match[1]?.trim();
  if (!token) {
    throw new Exception(HttpStatusCode.UNAUTHORIZED, 'Missing or invalid authorization header');
  }

  return token;
};

export default retrieveBearerToken;
