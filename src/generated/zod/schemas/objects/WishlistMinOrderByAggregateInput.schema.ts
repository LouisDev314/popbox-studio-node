import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const WishlistMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WishlistMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistMinOrderByAggregateInput>;
export const WishlistMinOrderByAggregateInputObjectZodSchema = makeSchema();
