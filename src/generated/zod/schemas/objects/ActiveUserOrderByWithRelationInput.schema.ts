import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ActiveUserOrderByRelevanceInputObjectSchema as ActiveUserOrderByRelevanceInputObjectSchema } from './ActiveUserOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  supabaseUserId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  role: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _relevance: z.lazy(() => ActiveUserOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const ActiveUserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ActiveUserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ActiveUserOrderByWithRelationInput>;
export const ActiveUserOrderByWithRelationInputObjectZodSchema = makeSchema();
