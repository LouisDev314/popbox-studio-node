import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { WishlistItemCountOrderByAggregateInputObjectSchema as WishlistItemCountOrderByAggregateInputObjectSchema } from './WishlistItemCountOrderByAggregateInput.schema';
import { WishlistItemMaxOrderByAggregateInputObjectSchema as WishlistItemMaxOrderByAggregateInputObjectSchema } from './WishlistItemMaxOrderByAggregateInput.schema';
import { WishlistItemMinOrderByAggregateInputObjectSchema as WishlistItemMinOrderByAggregateInputObjectSchema } from './WishlistItemMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  wishlistId: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => WishlistItemCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => WishlistItemMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => WishlistItemMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const WishlistItemOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.WishlistItemOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemOrderByWithAggregationInput>;
export const WishlistItemOrderByWithAggregationInputObjectZodSchema = makeSchema();
