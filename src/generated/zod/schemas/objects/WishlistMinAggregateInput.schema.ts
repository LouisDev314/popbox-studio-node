import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const WishlistMinAggregateInputObjectSchema: z.ZodType<Prisma.WishlistMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WishlistMinAggregateInputType>;
export const WishlistMinAggregateInputObjectZodSchema = makeSchema();
