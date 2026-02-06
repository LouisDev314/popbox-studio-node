import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const WishlistCountAggregateInputObjectSchema: z.ZodType<Prisma.WishlistCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WishlistCountAggregateInputType>;
export const WishlistCountAggregateInputObjectZodSchema = makeSchema();
