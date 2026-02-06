import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OrderOrderByWithRelationInputObjectSchema as OrderOrderByWithRelationInputObjectSchema } from './OrderOrderByWithRelationInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { OrderStatusHistoryOrderByRelevanceInputObjectSchema as OrderStatusHistoryOrderByRelevanceInputObjectSchema } from './OrderStatusHistoryOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  fromStatus: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  toStatus: SortOrderSchema.optional(),
  reason: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  changedBy: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  order: z.lazy(() => OrderOrderByWithRelationInputObjectSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  _relevance: z.lazy(() => OrderStatusHistoryOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const OrderStatusHistoryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryOrderByWithRelationInput>;
export const OrderStatusHistoryOrderByWithRelationInputObjectZodSchema = makeSchema();
