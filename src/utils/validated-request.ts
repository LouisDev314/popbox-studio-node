import type { Request } from 'express';

export const readValidatedBody = <T>(req: Request) => req.validated.body as T;

export const readValidatedParams = <T>(req: Request) => req.validated.params as T;

export const readValidatedQuery = <T>(req: Request) => req.validated.query as T;
