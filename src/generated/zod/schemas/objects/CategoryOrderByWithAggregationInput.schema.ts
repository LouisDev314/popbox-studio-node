import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CategoryCountOrderByAggregateInputObjectSchema as CategoryCountOrderByAggregateInputObjectSchema } from './CategoryCountOrderByAggregateInput.schema';
import { CategoryMaxOrderByAggregateInputObjectSchema as CategoryMaxOrderByAggregateInputObjectSchema } from './CategoryMaxOrderByAggregateInput.schema';
import { CategoryMinOrderByAggregateInputObjectSchema as CategoryMinOrderByAggregateInputObjectSchema } from './CategoryMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CategoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryOrderByWithAggregationInput>;
export const CategoryOrderByWithAggregationInputObjectZodSchema = makeSchema();
