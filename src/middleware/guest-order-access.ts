import { eq } from 'drizzle-orm';
import type { RequestHandler } from 'express';
import { db } from '../db';
import { orders } from '../db/schema';
import HttpStatusCode from '../constants/http-status-code';
import Exception from '../utils/Exception';
import {
  clearGuestOrderSessionCookie,
  buildClientOrderUrl,
  GUEST_ORDER_SESSION_COOKIE_NAME,
  readCookieValue,
  setGuestOrderSessionCookie,
  verifyGuestOrderAccessToken,
  verifyGuestOrderSessionToken,
  verifyLegacyGuestOrderAccessToken,
} from '../utils/guest-order-access';

const extractToken = (reqToken: unknown) => {
  return typeof reqToken === 'string' ? reqToken.trim() : '';
};

const loadGuestOrderAccessRecord = async (publicId: string) => {
  const [order] = await db
    .select({
      id: orders.id,
      publicId: orders.publicId,
      guestAccessTokenHash: orders.guestAccessTokenHash,
    })
    .from(orders)
    .where(eq(orders.publicId, publicId))
    .limit(1);

  if (!order) {
    throw new Exception(HttpStatusCode.UNAUTHORIZED, 'Invalid order access token');
  }

  return order;
};

const hasValidPresentedToken = (params: {
  presentedToken: string;
  publicId: string;
  guestAccessTokenHash: string | null;
}) => {
  return (
    verifyGuestOrderAccessToken(params.presentedToken, params.publicId) ||
    (!!params.guestAccessTokenHash &&
      verifyLegacyGuestOrderAccessToken(params.presentedToken, params.guestAccessTokenHash))
  );
};

export const exchangeGuestOrderAccess: RequestHandler = async (req, res, next) => {
  const publicId = typeof req.params.publicId === 'string' ? req.params.publicId : '';
  const presentedToken = extractToken(req.query.token) || extractToken(req.headers['x-order-token']);
  const sessionToken = readCookieValue(req.headers.cookie, GUEST_ORDER_SESSION_COOKIE_NAME);

  if (!publicId || (!presentedToken && !sessionToken)) {
    return next(
      new Exception(HttpStatusCode.UNAUTHORIZED, 'Valid order access token is required to exchange order access'),
    );
  }

  try {
    const order = await loadGuestOrderAccessRecord(publicId);

    if (sessionToken && verifyGuestOrderSessionToken(sessionToken, publicId)) {
      return res.redirect(302, buildClientOrderUrl(publicId));
    }

    if (
      !presentedToken ||
      !hasValidPresentedToken({ presentedToken, publicId, guestAccessTokenHash: order.guestAccessTokenHash })
    ) {
      if (sessionToken) {
        clearGuestOrderSessionCookie(res);
      }

      return next(new Exception(HttpStatusCode.UNAUTHORIZED, 'Invalid order access token'));
    }

    setGuestOrderSessionCookie(res, publicId);
    return res.redirect(302, buildClientOrderUrl(publicId));
  } catch (error) {
    return next(error);
  }
};

// Same browser access
export const requireGuestOrderAccess: RequestHandler = async (req, res, next) => {
  const publicId = typeof req.params.publicId === 'string' ? req.params.publicId : '';
  const sessionToken = readCookieValue(req.headers.cookie, GUEST_ORDER_SESSION_COOKIE_NAME);

  if (!publicId || !sessionToken) {
    return next(new Exception(HttpStatusCode.UNAUTHORIZED, 'Valid order access token is required'));
  }

  const order = await loadGuestOrderAccessRecord(publicId);

  if (verifyGuestOrderSessionToken(sessionToken, publicId)) {
    req.orderAccess = {
      orderId: order.id,
      publicId: order.publicId,
    };

    return next();
  }

  clearGuestOrderSessionCookie(res);
  return next(new Exception(HttpStatusCode.UNAUTHORIZED, 'Invalid order access session'));
};
