import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const WishlistMaxAggregateInputObjectSchema: z.ZodType<Prisma.WishlistMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WishlistMaxAggregateInputType>;
export const WishlistMaxAggregateInputObjectZodSchema = makeSchema();
