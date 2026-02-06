import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const OrderAddressOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.OrderAddressOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressOrderByRelationAggregateInput>;
export const OrderAddressOrderByRelationAggregateInputObjectZodSchema = makeSchema();
