import type { Request, Response, NextFunction } from 'express';
import supabase from '../config/supabase';
import Exception from '../utils/Exception';
import { HttpStatusCode } from 'axios';
import retrieveToken from '../utils/retrieve-token';

export interface AuthedRequest extends Request {
  auth?: {
    userId: string;
    email?: string;
  };
}

export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization || '';
    const token = retrieveToken(header);
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
