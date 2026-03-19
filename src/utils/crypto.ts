import { createHmac, randomBytes, randomUUID } from 'crypto';
import getEnvConfig from '../config/env';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

export const createGuestAccessToken = () => randomBytes(24).toString('base64url');

export const hashGuestAccessToken = (token: string) => {
  return createHmac('sha256', getEnvConfig().orderTokenPepper).update(token).digest('hex');
};

export const createPublicId = (prefix: string) => {
  return `${prefix}-${nanoid()}`;
};

export const createTicketNumber = () => {
  return `tkt_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
};
