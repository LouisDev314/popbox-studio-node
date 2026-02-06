import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  wishlistId: z.literal(true).optional(),
  productId: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const WishlistItemMaxAggregateInputObjectSchema: z.ZodType<Prisma.WishlistItemMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemMaxAggregateInputType>;
export const WishlistItemMaxAggregateInputObjectZodSchema = makeSchema();
