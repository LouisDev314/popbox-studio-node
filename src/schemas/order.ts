import { z } from 'zod';

export const publicOrderParamsSchema = z.object({
  publicId: z.string().min(1),
});

export const orderAccessQuerySchema = z.object({
  token: z.string().min(1).optional(),
});

export const revealTicketParamsSchema = z.object({
  publicId: z.string().min(1),
  ticketId: z.uuid(),
});
