import Exception from './Exception';
import HttpStatusCode from '../constants/http-status-code';

const retrieveToken = (header: string) => {
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new Exception(HttpStatusCode.UNAUTHORIZED, 'Missing or invalid authorization header');

  return match[1]?.trim();
};

export default retrieveToken;
