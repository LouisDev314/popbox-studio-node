import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { WishlistItemOrderByRelationAggregateInputObjectSchema as WishlistItemOrderByRelationAggregateInputObjectSchema } from './WishlistItemOrderByRelationAggregateInput.schema';
import { WishlistOrderByRelevanceInputObjectSchema as WishlistOrderByRelevanceInputObjectSchema } from './WishlistOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  items: z.lazy(() => WishlistItemOrderByRelationAggregateInputObjectSchema).optional(),
  _relevance: z.lazy(() => WishlistOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const WishlistOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.WishlistOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistOrderByWithRelationInput>;
export const WishlistOrderByWithRelationInputObjectZodSchema = makeSchema();
