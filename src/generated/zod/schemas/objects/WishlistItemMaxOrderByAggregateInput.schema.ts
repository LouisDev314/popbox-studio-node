import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  wishlistId: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const WishlistItemMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WishlistItemMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemMaxOrderByAggregateInput>;
export const WishlistItemMaxOrderByAggregateInputObjectZodSchema = makeSchema();
