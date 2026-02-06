import Exception from './Exception';
import { HttpStatusCode } from 'axios';

const retrieveToken = (header: string) => {
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new Exception(HttpStatusCode.Unauthorized, 'Missing or invalid authorization header');

  return match[1].trim();
};

export default retrieveToken;
