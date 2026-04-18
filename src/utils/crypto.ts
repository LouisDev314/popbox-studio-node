import { createHmac, randomBytes, randomUUID } from 'crypto';
import getEnvConfig from '../config/env';

const PUBLIC_ID_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const PUBLIC_ID_LENGTH = 10;

const createAlphaNumericId = (length: number) => {
  const bytes = randomBytes(length);
  let value = '';

  for (const byte of bytes) {
    value += PUBLIC_ID_ALPHABET[byte % PUBLIC_ID_ALPHABET.length];
  }

  return value;
};

export const createGuestAccessToken = () => randomBytes(24).toString('base64url');

export const hashGuestAccessToken = (token: string) => {
  return createHmac('sha256', getEnvConfig().orderTokenPepper).update(token).digest('hex');
};

export const createPublicId = (prefix: string) => {
  return `${prefix}-${createAlphaNumericId(PUBLIC_ID_LENGTH)}`;
};

export const createTicketNumber = () => {
  return `tkt_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
};
