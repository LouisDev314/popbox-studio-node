import type { JWTPayload } from 'jose';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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
