import { eq } from 'drizzle-orm';
import type { RequestHandler } from 'express';
import type { JWTVerifyOptions, createRemoteJWKSet as CreateRemoteJWKSet, jwtVerify as JwtVerify } from 'jose';

import getEnvConfig from '../config/env';
import { db } from '../db';
import { users } from '../db/schema';
import Exception from '../utils/Exception';
import HttpStatusCode from '../constants/http-status-code';
import retrieveBearerToken from '../utils/retrieve-bearer-token';

const issuer = `${getEnvConfig().supabaseUrl}/auth/v1`;
const verifyOptions = {
  issuer,
  audience: 'authenticated',
} satisfies JWTVerifyOptions;

type JoseModule = {
  createRemoteJWKSet: typeof CreateRemoteJWKSet;
  jwtVerify: typeof JwtVerify;
};

const dynamicImport = new Function('specifier', 'return import(specifier)') as <T>(specifier: string) => Promise<T>;
let joseModulePromise: Promise<JoseModule> | null = null;
let remoteJwkSetPromise: Promise<ReturnType<typeof CreateRemoteJWKSet>> | null = null;

const loadJoseModule = () => {
  if (!joseModulePromise) {
    joseModulePromise = dynamicImport<JoseModule>('jose');
  }

  return joseModulePromise;
};

const loadRemoteJwkSet = async () => {
  if (!remoteJwkSetPromise) {
    remoteJwkSetPromise = loadJoseModule().then(({ createRemoteJWKSet }) =>
      createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`)),
    );
  }

  return remoteJwkSetPromise;
};

const requireAdminAuth: RequestHandler = async (req, _res, next) => {
  try {
    const token = retrieveBearerToken(req.headers.authorization);
    const [{ jwtVerify }, jwks] = await Promise.all([loadJoseModule(), loadRemoteJwkSet()]);

    const { payload } = await jwtVerify(token, jwks, verifyOptions);

    const userId = typeof payload.sub === 'string' ? payload.sub : '';

    if (!userId) {
      return next(new Exception(HttpStatusCode.UNAUTHORIZED, 'Invalid authentication token - no user id'));
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
      email: user.email || '',
      role: user.role,
      claims: payload,
    };

    next();
  } catch {
    return next(new Exception(HttpStatusCode.UNAUTHORIZED, 'Invalid authentication token'));
  }
};

export default requireAdminAuth;
