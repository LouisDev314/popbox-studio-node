import * as z from 'zod';

export const CartSchema = z.object({
  id: z.string(),
  userId: z.string(),
  updatedAt: z.date().nullish(),
});

export type CartType = z.infer<typeof CartSchema>;
