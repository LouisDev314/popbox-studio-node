import { createHmac } from 'crypto';
import type { CookieOptions, Response } from 'express';
import getEnvConfig from '../config/env';
import { hashGuestAccessToken } from './crypto';

const GUEST_ORDER_ACCESS_TOKEN_KIND = 'guest_order_access';
const GUEST_ORDER_SESSION_TOKEN_KIND = 'guest_order_session';
const GUEST_ORDER_TOKEN_VERSION = 'v1';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const GUEST_ORDER_ACCESS_TOKEN_MAX_AGE_MS = 180 * DAY_IN_MS;
const GUEST_ORDER_SESSION_MAX_AGE_MS = 180 * DAY_IN_MS;

export const GUEST_ORDER_SESSION_COOKIE_NAME = 'guest_order_session';

type GuestOrderTokenKind = typeof GUEST_ORDER_ACCESS_TOKEN_KIND | typeof GUEST_ORDER_SESSION_TOKEN_KIND;

type GuestOrderSignedTokenPayload = {
  v: typeof GUEST_ORDER_TOKEN_VERSION;
  kind: GuestOrderTokenKind;
  publicId: string;
  guestAccessTokenHash: string;
  iat: number;
  exp: number;
};

const signTokenPayload = (payloadSegment: string) => {
  return createHmac('sha256', getEnvConfig().orderTokenPepper).update(payloadSegment).digest('base64url');
};

const createSignedToken = (payload: GuestOrderSignedTokenPayload) => {
  const payloadSegment = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signatureSegment = signTokenPayload(payloadSegment);
  return `${payloadSegment}.${signatureSegment}`;
};

const parseSignedToken = (token: string): GuestOrderSignedTokenPayload | null => {
  const [payloadSegment, signatureSegment] = token.split('.');

  if (!payloadSegment || !signatureSegment) {
    return null;
  }

  if (signTokenPayload(payloadSegment) !== signatureSegment) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadSegment, 'base64url').toString('utf8'),
    ) as GuestOrderSignedTokenPayload;

    if (
      payload.v !== GUEST_ORDER_TOKEN_VERSION ||
      typeof payload.publicId !== 'string' ||
      typeof payload.guestAccessTokenHash !== 'string' ||
      typeof payload.iat !== 'number' ||
      typeof payload.exp !== 'number'
    ) {
      return null;
    }

    if (payload.exp <= Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

const buildGuestOrderToken = (
  kind: GuestOrderTokenKind,
  publicId: string,
  guestAccessTokenHash: string,
  ttlMs: number,
) => {
  if (!guestAccessTokenHash.trim()) {
    throw new Error('Guest order access token hash is required');
  }

  const now = Date.now();
  return createSignedToken({
    v: GUEST_ORDER_TOKEN_VERSION,
    kind,
    publicId,
    guestAccessTokenHash,
    iat: now,
    exp: now + ttlMs,
  });
};

export const createGuestOrderAccessToken = (publicId: string, guestAccessTokenHash: string) => {
  return buildGuestOrderToken(
    GUEST_ORDER_ACCESS_TOKEN_KIND,
    publicId,
    guestAccessTokenHash,
    GUEST_ORDER_ACCESS_TOKEN_MAX_AGE_MS,
  );
};

export const createGuestOrderSessionToken = (publicId: string, guestAccessTokenHash: string) => {
  return buildGuestOrderToken(
    GUEST_ORDER_SESSION_TOKEN_KIND,
    publicId,
    guestAccessTokenHash,
    GUEST_ORDER_SESSION_MAX_AGE_MS,
  );
};

const verifyGuestOrderToken = (
  token: string,
  expectedKind: GuestOrderTokenKind,
  publicId: string,
  guestAccessTokenHash: string,
) => {
  const payload = parseSignedToken(token);

  if (!payload) {
    return false;
  }

  return (
    payload.kind === expectedKind &&
    payload.publicId === publicId &&
    payload.guestAccessTokenHash === guestAccessTokenHash
  );
};

export const verifyGuestOrderAccessToken = (token: string, publicId: string, guestAccessTokenHash: string) => {
  return verifyGuestOrderToken(token, GUEST_ORDER_ACCESS_TOKEN_KIND, publicId, guestAccessTokenHash);
};

export const verifyGuestOrderSessionToken = (token: string, publicId: string, guestAccessTokenHash: string) => {
  return verifyGuestOrderToken(token, GUEST_ORDER_SESSION_TOKEN_KIND, publicId, guestAccessTokenHash);
};

export const verifyLegacyGuestOrderAccessToken = (token: string, guestAccessTokenHash: string) => {
  return hashGuestAccessToken(token) === guestAccessTokenHash;
};

export const buildClientOrderUrl = (publicId: string) => {
  return `${getEnvConfig().clientBaseUrl}/orders/${publicId}`;
};

export const buildGuestOrderAccessUrl = (publicId: string, guestAccessTokenHash: string) => {
  const token = createGuestOrderAccessToken(publicId, guestAccessTokenHash);
  return `${getEnvConfig().clientBaseUrl}/api/v1/orders/${publicId}/access?token=${encodeURIComponent(token)}`;
};

export const getGuestOrderSessionCookieOptions = (publicId: string): CookieOptions => {
  const isProd = getEnvConfig().nodeEnv === 'production';

  return {
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
    maxAge: GUEST_ORDER_SESSION_MAX_AGE_MS,
    path: `/api/v1/orders/${publicId}`,
  };
};

export const setGuestOrderSessionCookie = (res: Response, publicId: string, guestAccessTokenHash: string) => {
  res.cookie(
    GUEST_ORDER_SESSION_COOKIE_NAME,
    createGuestOrderSessionToken(publicId, guestAccessTokenHash),
    getGuestOrderSessionCookieOptions(publicId),
  );
};

export const clearGuestOrderSessionCookie = (res: Response, publicId: string) => {
  res.clearCookie(GUEST_ORDER_SESSION_COOKIE_NAME, getGuestOrderSessionCookieOptions(publicId));
};

export const readCookieValue = (cookieHeader: string | undefined, cookieName: string) => {
  if (!cookieHeader) {
    return '';
  }

  const cookies = cookieHeader.split(';');

  for (const cookie of cookies) {
    const separatorIndex = cookie.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const name = cookie.slice(0, separatorIndex).trim();

    if (name !== cookieName) {
      continue;
    }

    return decodeURIComponent(cookie.slice(separatorIndex + 1).trim());
  }

  return '';
};
