import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CollectionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CollectionMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionMinOrderByAggregateInput>;
export const CollectionMinOrderByAggregateInputObjectZodSchema = makeSchema();
