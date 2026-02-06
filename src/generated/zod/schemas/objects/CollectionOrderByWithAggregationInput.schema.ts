import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CollectionCountOrderByAggregateInputObjectSchema as CollectionCountOrderByAggregateInputObjectSchema } from './CollectionCountOrderByAggregateInput.schema';
import { CollectionMaxOrderByAggregateInputObjectSchema as CollectionMaxOrderByAggregateInputObjectSchema } from './CollectionMaxOrderByAggregateInput.schema';
import { CollectionMinOrderByAggregateInputObjectSchema as CollectionMinOrderByAggregateInputObjectSchema } from './CollectionMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => CollectionCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CollectionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CollectionMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CollectionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CollectionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionOrderByWithAggregationInput>;
export const CollectionOrderByWithAggregationInputObjectZodSchema = makeSchema();
