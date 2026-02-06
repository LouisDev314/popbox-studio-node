import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ShipmentItemOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ShipmentItemOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemOrderByRelationAggregateInput>;
export const ShipmentItemOrderByRelationAggregateInputObjectZodSchema = makeSchema();
