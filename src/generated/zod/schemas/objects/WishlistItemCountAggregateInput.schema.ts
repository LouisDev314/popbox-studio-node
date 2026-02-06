import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  wishlistId: z.literal(true).optional(),
  productId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const WishlistItemCountAggregateInputObjectSchema: z.ZodType<Prisma.WishlistItemCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemCountAggregateInputType>;
export const WishlistItemCountAggregateInputObjectZodSchema = makeSchema();
