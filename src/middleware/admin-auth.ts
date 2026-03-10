import { eq } from 'drizzle-orm';
import type { RequestHandler } from 'express';
import { jwtVerify, createRemoteJWKSet } from 'jose';

import getEnvConfig from '../config/env';
import { db } from '../db';
import { users } from '../db/schema';
import Exception from '../utils/Exception';
import HttpStatusCode from '../constants/http-status-code';
import retrieveBearerToken from '../utils/retrieve-bearer-token';

const issuer = `${getEnvConfig().supabaseUrl}/auth/v1`;

// Ask Supabase public key server for verification keys and cache it
const JWKS = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));

const requireAdminAuth: RequestHandler = async (req, _res, next) => {
  try {
    const token = retrieveBearerToken(req.headers.authorization);

    const { payload } = await jwtVerify(token, JWKS, {
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
