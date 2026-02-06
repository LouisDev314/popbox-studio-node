import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const WishlistItemOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.WishlistItemOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemOrderByRelationAggregateInput>;
export const WishlistItemOrderByRelationAggregateInputObjectZodSchema = makeSchema();
