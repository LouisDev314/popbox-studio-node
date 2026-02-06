import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { WishlistOrderByWithRelationInputObjectSchema as WishlistOrderByWithRelationInputObjectSchema } from './WishlistOrderByWithRelationInput.schema';
import { CartOrderByWithRelationInputObjectSchema as CartOrderByWithRelationInputObjectSchema } from './CartOrderByWithRelationInput.schema';
import { OrderOrderByRelationAggregateInputObjectSchema as OrderOrderByRelationAggregateInputObjectSchema } from './OrderOrderByRelationAggregateInput.schema';
import { OrderStatusHistoryOrderByRelationAggregateInputObjectSchema as OrderStatusHistoryOrderByRelationAggregateInputObjectSchema } from './OrderStatusHistoryOrderByRelationAggregateInput.schema';
import { UserOrderByRelevanceInputObjectSchema as UserOrderByRelevanceInputObjectSchema } from './UserOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  supabaseUserId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  role: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  deletedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  wishlist: z.lazy(() => WishlistOrderByWithRelationInputObjectSchema).optional(),
  cart: z.lazy(() => CartOrderByWithRelationInputObjectSchema).optional(),
  orders: z.lazy(() => OrderOrderByRelationAggregateInputObjectSchema).optional(),
  orderStatusHistories: z.lazy(() => OrderStatusHistoryOrderByRelationAggregateInputObjectSchema).optional(),
  _relevance: z.lazy(() => UserOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
