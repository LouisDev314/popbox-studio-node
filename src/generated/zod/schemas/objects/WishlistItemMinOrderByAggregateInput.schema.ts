import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  wishlistId: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const WishlistItemMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WishlistItemMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemMinOrderByAggregateInput>;
export const WishlistItemMinOrderByAggregateInputObjectZodSchema = makeSchema();
