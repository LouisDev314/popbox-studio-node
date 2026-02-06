import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ActiveUserCountOrderByAggregateInputObjectSchema as ActiveUserCountOrderByAggregateInputObjectSchema } from './ActiveUserCountOrderByAggregateInput.schema';
import { ActiveUserMaxOrderByAggregateInputObjectSchema as ActiveUserMaxOrderByAggregateInputObjectSchema } from './ActiveUserMaxOrderByAggregateInput.schema';
import { ActiveUserMinOrderByAggregateInputObjectSchema as ActiveUserMinOrderByAggregateInputObjectSchema } from './ActiveUserMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  supabaseUserId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  role: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => ActiveUserCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ActiveUserMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ActiveUserMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ActiveUserOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ActiveUserOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ActiveUserOrderByWithAggregationInput>;
export const ActiveUserOrderByWithAggregationInputObjectZodSchema = makeSchema();
