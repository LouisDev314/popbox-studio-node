import type { JWTPayload } from 'jose';

declare global {
  namespace Express {
    interface Request {
      id: string;
      validated: {
        body?: unknown;
        query?: unknown;
        params?: unknown;
      };
      authUser?: {
        id: string;
        email: string;
        role: string;
        claims: JWTPayload;
      };
      orderAccess?: {
        orderId: string;
        publicId: string;
        token: string;
      };
    }
  }
}

export {};

