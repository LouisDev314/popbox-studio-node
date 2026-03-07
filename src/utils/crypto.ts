import { createHmac, randomBytes, randomUUID } from 'crypto';
import getEnvConfig from '../config/env';

const env = getEnvConfig();

export const createGuestAccessToken = () => randomBytes(24).toString('base64url');

export const hashGuestAccessToken = (token: string) => {
  return createHmac('sha256', env.orderTokenPepper || 'development-pepper').update(token).digest('hex');
};

export const createPublicId = (prefix: string) => {
  return `${prefix}_${randomBytes(6).toString('hex')}`;
};

export const createTicketNumber = () => {
  return `tkt_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
};
