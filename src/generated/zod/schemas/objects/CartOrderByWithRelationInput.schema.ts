import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { CartItemOrderByRelationAggregateInputObjectSchema as CartItemOrderByRelationAggregateInputObjectSchema } from './CartItemOrderByRelationAggregateInput.schema';
import { CartOrderByRelevanceInputObjectSchema as CartOrderByRelevanceInputObjectSchema } from './CartOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  items: z.lazy(() => CartItemOrderByRelationAggregateInputObjectSchema).optional(),
  _relevance: z.lazy(() => CartOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const CartOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CartOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CartOrderByWithRelationInput>;
export const CartOrderByWithRelationInputObjectZodSchema = makeSchema();
