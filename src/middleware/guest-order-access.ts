import { and, eq } from 'drizzle-orm';
import type { RequestHandler } from 'express';
import { db } from '../db';
import { orders } from '../db/schema';
import HttpStatusCode from '../constants/http-status-code';
import Exception from '../utils/Exception';
import { hashGuestAccessToken } from '../utils/crypto';

const extractToken = (reqToken: unknown) => {
  return typeof reqToken === 'string' ? reqToken.trim() : '';
};

const requireGuestOrderAccess: RequestHandler = async (req, _res, next) => {
  const publicId = typeof req.params.publicId === 'string' ? req.params.publicId : '';
  const token = extractToken(req.headers['x-order-token']) || extractToken(req.query.token);

  if (!publicId || !token) {
    return next(new Exception(HttpStatusCode.UNAUTHORIZED, 'Valid order access token is required'));
  }

  const hashedToken = hashGuestAccessToken(token);

  const [order] = await db
    .select({
      id: orders.id,
      publicId: orders.publicId,
    })
    .from(orders)
    .where(and(eq(orders.publicId, publicId), eq(orders.guestAccessTokenHash, hashedToken)))
    .limit(1);

  if (!order) {
    return next(new Exception(HttpStatusCode.UNAUTHORIZED, 'Invalid order access token'));
  }

  req.orderAccess = {
    orderId: order.id,
    publicId: order.publicId,
    token,
  };

  next();
};

export default requireGuestOrderAccess;
