import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  supabaseUserId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ActiveUserMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ActiveUserMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ActiveUserMaxOrderByAggregateInput>;
export const ActiveUserMaxOrderByAggregateInputObjectZodSchema = makeSchema();
