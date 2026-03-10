import { eq } from 'drizzle-orm';
import type { RequestHandler } from 'express';
import type { JWTPayload } from 'jose';
import getEnvConfig from '../config/env';
import { db } from '../db';
import { users } from '../db/schema';
import Exception from '../utils/Exception';
import HttpStatusCode from '../constants/http-status-code';
import retrieveBearerToken from '../utils/retrieve-bearer-token';

const issuer = `${getEnvConfig().supabaseUrl}/auth/v1`;
let joseModulePromise: Promise<typeof import('jose')> | null = null;
let jwksPromise: Promise<ReturnType<(typeof import('jose'))['createRemoteJWKSet']>> | null = null;

const loadJose = async () => {
  if (!joseModulePromise) {
    joseModulePromise = import('jose');
  }

  return joseModulePromise;
};

const getJwks = async () => {
  if (!jwksPromise) {
    jwksPromise = loadJose().then(({ createRemoteJWKSet }) =>
      createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`)),
    );
  }

  return jwksPromise;
};

const readEmail = (claims: JWTPayload) => {
  const email = claims.email;
  return typeof email === 'string' ? email : '';
};

const isJoseAuthenticationError = (error: unknown) =>
  error instanceof Error &&
  (error.name.startsWith('JOSE') || error.name.startsWith('JWS') || error.name.startsWith('JWT'));

const requireAdminAuth: RequestHandler = async (req, _res, next) => {
  try {
    const token = retrieveBearerToken(String(req.headers));
    const [{ jwtVerify }, jwks] = await Promise.all([loadJose(), getJwks()]);
    const { payload } = await jwtVerify(token, jwks, {
      issuer,
      audience: 'authenticated',
    });

    const userId = typeof payload.sub === 'string' ? payload.sub : '';
    if (!userId) {
      return next(new Exception(HttpStatusCode.UNAUTHORIZED, 'Invalid authentication token'));
    }

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (!user) {
      return next(new Exception(HttpStatusCode.FORBIDDEN, 'Admin account not provisioned'));
    }

    if (user.role !== 'admin') {
      return next(new Exception(HttpStatusCode.FORBIDDEN, 'Admin access is required'));
    }

    req.authUser = {
      id: user.id,
      email: user.email || readEmail(payload),
      role: user.role,
      claims: payload,
    };

    next();
  } catch (error) {
    if (isJoseAuthenticationError(error)) {
      return next(new Exception(HttpStatusCode.UNAUTHORIZED, 'Invalid authentication token'));
    }

    next(error);
  }
};

export default requireAdminAuth;
