import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional()
}).strict();
export const ShipmentItemSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ShipmentItemSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemSumOrderByAggregateInput>;
export const ShipmentItemSumOrderByAggregateInputObjectZodSchema = makeSchema();
