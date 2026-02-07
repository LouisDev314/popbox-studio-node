import type { Request, Response, NextFunction } from 'express';
import supabase from '../config/supabase';
import Exception from '../utils/Exception';
import { HttpStatusCode } from 'axios';

export interface AuthedRequest extends Request {
  auth?: {
    userId: string;
    email?: string;
  };
}

export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.match(/^Bearer\s+(.+)$/i)?.[1] ?? null;
    if (!token) throw new Exception(HttpStatusCode.Unauthorized, 'Missing auth token');

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      throw new Exception(HttpStatusCode.Unauthorized, 'Invalid or expired token');
    }

    req.auth = { userId: data.user.id, email: data.user.email };
    return next();
  } catch (err) {
    if (err instanceof Exception) throw err;
    throw new Exception(HttpStatusCode.Unauthorized, `Unauthorized Supabase: ${err}`);
  }
};
